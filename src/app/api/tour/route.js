import { NextResponse } from 'next/server'

const BANDSINTOWN_ARTIST = 'Sena+%C5%9Eener'
const BANDSINTOWN_APP_ID = 'sena-sener-website'

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vS9GzbalaUXSTHZDYum9oDe8yFxRSl0dSkEG-AbDARMjV1qNwht0jl-yXwEv9C18DadSDfpRlmsZqqu/pub?output=csv'

function parseCsv(text) {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []
  const [headerLine, ...rows] = lines
  const headers = headerLine.split(',').map((h) => h.trim().toLowerCase())
  return rows
    .map((line) => {
      if (!line.trim()) return null
      const cols = line.split(',').map((c) => c.trim())
      const obj = {}
      headers.forEach((h, i) => { obj[h] = cols[i] || '' })
      return obj
    })
    .filter(Boolean)
}

export async function GET() {
  // Try Bandsintown first (powers Spotify concert listings)
  try {
    const res = await fetch(
      `https://rest.bandsintown.com/artists/${BANDSINTOWN_ARTIST}/events?app_id=${BANDSINTOWN_APP_ID}&date=upcoming`,
      { cache: 'no-store' }
    )
    if (res.ok) {
      const events = await res.json()
      if (Array.isArray(events) && events.length > 0) {
        const shows = events.map((ev) => ({
          date: ev.datetime.split('T')[0],
          city: ev.venue.city,
          venue: ev.venue.name,
          ticketUrl:
            ev.offers?.find((o) => o.type === 'Tickets')?.url || ev.url || null,
          status: ev.offers?.some((o) => o.status === 'available')
            ? 'onsale'
            : 'soldout',
        }))
        return NextResponse.json({ shows })
      }
    }
  } catch (e) {
    console.error('Bandsintown fetch failed:', e)
  }

  // Fall back to Google Sheets
  try {
    const res = await fetch(SHEET_URL, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch sheet')
    const csv = await res.text()
    const rows = parseCsv(csv)
    const shows = rows
      .filter((r) => r.date)
      .map((r) => ({
        date: r.date,
        city: r.city,
        venue: r.venue,
        bubilet: r.bubilet,
        biletix: r.biletix,
        status: (r.sale || 'onsale').toLowerCase(),
      }))
    return NextResponse.json({ shows })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { shows: [], error: 'Failed to load tour data' },
      { status: 500 }
    )
  }
}
