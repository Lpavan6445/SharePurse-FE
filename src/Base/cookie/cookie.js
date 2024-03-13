/**
 * Determines if the passed string is of ipv4 format.
 * @param {String} str
 * @returns True if ipv4 string
 */
function isIpv4Address(str = "") {
  return str.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/);
}

/**
 * Creates a cookie.
 * If days is not passed, then the cookie will become a session only cookie
 * @param {String} name name of the cookie
 * @param {String} value value of the cookie
 * @param {Date} [expiryDte] Date Object
 */
function set(name, value, expiryDte, onDomain = false) {
  let expires = "";
  let domain = "";

  if (expiryDte) {
    expires = `; expires=${expiryDte.toUTCString()}`;
  }

  if (onDomain) {
    const host = new URL(window.location.href);
    if (isIpv4Address(window.location.href)) {
      domain = `; domain=${host.hostname}`;
    } else {
      const splits = host.hostname.split(".");
      if (splits.length > 2) {
        domain = `; domain=${splits[splits.length - 2]}.${
          splits[splits.length - 1]
        }`;
      } else {
        domain = `; domain=${host.hostname}`;
      }
    }
  }

  window.document.cookie = `${name}=${value}${expires}${domain}; path=/`;
}

/**
 * Gets a cookie if it is present
 * @param {String} name name of the cookie
 * @returns {String|null}
 */
function get(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }

  return null;
}

/**
 * Removes a cookie by setting its expiry time to old date
 * @param {String} name name of the cookie
 */
function remove(name) {
  const dte = new Date();
  dte.setDate(dte.getDate() - 10000);
  set(name, "", dte);
}

function deleteAllCookies() {
  const allCookies = document.cookie.split(";");
  // The "expire" attribute of every cookie is
  // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
  for (let i = 0; i < allCookies.length; i += 1) {
    window.document.cookie = `${allCookies[i]}=;expires=${new Date(0).toUTCString()}`;
  }
}


const cookies = {
  set,
  get,
  remove,
};

export default cookies;
