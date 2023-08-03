// To store user search queries in browser cookie
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

// To retrieve user queries from browser cookie in the form of a string
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

// To retrieve user queries from browser cookie in the form of a string[]
export function getExistingQueries(): string[] {
  const cookieValue = getCookie("searchQueries");
  return cookieValue ? JSON.parse(cookieValue) : [];
}

// check if 2 queries are similar
export function areStringsSimilar(str1: string, str2: string): boolean {
  const words1 = str1.toLowerCase().split(" ");
  const words2 = str2.toLowerCase().split(" ");

  // Compare each word in words1 with each word in words2
  for (const word1 of words1) {
    for (const word2 of words2) {
      if (word1 === word2) {
        return true;
      }
    }
  }

  return false;
}

// Add a new query considering similarity and size constraints
export function addStringToArray(existingQueries: string[], newItem: string) {
  const MAX_ITEMS = 3;
  const index = existingQueries.findIndex((query) =>
    areStringsSimilar(query, newItem)
  );

  if (index !== -1) {
    // If a similar string exists, replace it with the new item
    existingQueries[index] = newItem;
  } else {
    while (existingQueries.length >= MAX_ITEMS) {
      // If the array has reached the maximum number of items, remove the items until
      // we have (MAX_ITEMS - 1) length.
      existingQueries.shift();
    }
    // Add the current item to the back of the array, now we have (MAX_ITEMS) length
    existingQueries.push(newItem);
  }
}

// update cookie based on new user query
export function updateCookie(searchInput: string) {
  const existingQueries = getExistingQueries() || [];
  addStringToArray(existingQueries, searchInput);
  setCookie("searchQueries", JSON.stringify(existingQueries), 30);
}
