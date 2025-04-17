function isValidPath(urlString: string) {
  try {
    // TODO: Think of some other mechanisms as hardcoding strings is not a good practice.
    new URL(urlString, "http://0.0.0.0");

    return true;
  } catch {
    return false;
  }
}

export default isValidPath;
