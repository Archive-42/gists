function parseUrl(url) {
  // Berners Lee url parsing: https://tools.ietf.org/html/rfc3986#appendix-B
  let re = new RegExp('^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?')

  let parsed = url.match(re);
  let result = {
    url : url,
    protocol: parsed[2],
    origin: parsed[4],
    pathname: (parsed[5]||'').replace(/^\//,'').replace(/\/$/,''),
    hash: ((parsed[9]||'').split('?')[0]||'').replace(/^\//,'').replace(/\/$/,''),
    search : (url||'').split('?')[1],
    searchProps : {}
  }

  if (result.search) {
    result.search.split(';').map(entry=>{
      let [key,value] = entry.split('=');
      result.searchProps[decodeURIComponent(key)] = decodeURIComponent(value);
    });
  }

  return result

}
export default parseUrl;

//console.log(parseUrl('https://sub.domain.org'));
//console.log(parseUrl('https://sub.domain.org/'));
//console.log(parseUrl('https://sub.domain.org#tag'));
//console.log(parseUrl('https://sub.domain.org/#tag'));
// console.log(parseUrl('https://sub.domain.org/path1#tag'));
//console.log(parseUrl('https://sub.domain.org/path1/path2?prop1=one;prop2=two'));
//console.log(parseUrl('https://sub.domain.org/page1/page2#tag?prop1=one;prop2=two'));
//console.log(parseUrl('https://sub.domain.org/page1/page2/#/subtag?prop1=one;prop2=two'));
//console.log(parseUrl('https://sub.domain.org/page1/page2/#/subtag1/subtag2?prop1=one;prop2=two'));