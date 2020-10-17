const data = {};
var   division = null;

const readParams = function (url, params) {
  let keys = Object.keys(params);

  for (let index in keys) {
    let key = keys[index];
    let value = params[key];
    
    if (index == 0) {
      url += `?${key}=${value}`;
    } else {
      url += `&${key}=${value}`;
    }
  }

  return url;
}

const convert = function (type, value) {
  try {
    switch (type) {
      case 'send':
        return JSON.stringify(value);
      case 'received':
        return JSON.parse(value);
    }
  } catch (error) {
    console.error(error);
    return value;
  }
}

const request = (method = '', url = '', options = { headers: {}, params: {}, body: {} }) => {
  return new Promise((resolve, reject) => {
    try {
      var xmlHttp = new XMLHttpRequest();

      if (options.params) url = readParams(url, options.params);

      xmlHttp.onloadend = () => {
        resolve(convert('received', xmlHttp.responseText));
      }

      xmlHttp.open(method ? method.toUpperCase() : 'GET', url, true);
      xmlHttp.send(null);
    } catch (error) {
      console.error(error);
      throw { error: 'call message', message: 'error in function request' };
    }
  });
}

const listenClick = async (button) => {
  let clicks= 1;
  if (!data[button]) {
    data[button] = { button, clicks }
  } else {
    data[button].clicks++;
    clicks = data[button].clicks;
  }

  await sleep(1);

  if (clicks == data[button].clicks) {
    delete data[button];
    let response = await request('get', 'http://10.0.0.109:3000/api/latter/', { params: { button, clicks } });

    division.value += response.result.latter;
  }
}

const sleep = function (time) {
  time = parseFloat(time) || 1;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time)
  });
}

const buttonClick = async (event= new MouseEvent) => {
  let button = event.srcElement.innerHTML;
  listenClick(button);
}

window.onload = () => {
  division = document.getElementById('story');
}