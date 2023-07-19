//To store user search query in browser cookie
export function setCookie(
  name: string,
  value: string,
  daysToExpire: number
): void {
  const date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
  console.log("Set cookie successfully!", value);
}

//To retrieve list of user search queries from browser cookie
export function getCookie(name: string): string | null {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

// To get existing queries from cookie in JSON form. Returns null if cookie not found.
export function getExistingQueries(): string[] {
  const cookieValue = getCookie("searchQueries");
  return cookieValue ? JSON.parse(cookieValue) : [];
}
