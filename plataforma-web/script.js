const data = {};

const request = (method = '', url = '', options = { headers: {}, params: {}, body: {} }) => {
  return new Promise((resolve, reject) => {
    try {
      var xmlHttp = new XMLHttpRequest();
    } catch (error) {
      
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
    await request('get', 'http://10.0.0.109:3000/api/latter/', { params: { button, clicks } });
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

const click = async (event = new MouseEvent) => {
  let element = event.srcElement;
}