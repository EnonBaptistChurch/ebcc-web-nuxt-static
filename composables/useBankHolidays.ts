const BANK_HOLIDAYS_URL = 'https://www.gov.uk/bank-holidays.json';

// Runs once per build, on any branch. Falls back to [] if gov.uk is unreachable.
export async function getGoodFridays(): Promise<string[]> {
  try {
    const res = await fetch(BANK_HOLIDAYS_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const goodFridays = data['england-and-wales'].events
      .filter((e: { title: string }) => e.title === 'Good Friday')
      .map((e: { date: string }) => e.date);
      console.log(goodFridays);
    return  goodFridays;// "YYYY-MM-DD"
  } catch (err) {
    console.warn('Bank holiday fetch failed, using calculated Good Friday:', err);
    return [];
  }
}