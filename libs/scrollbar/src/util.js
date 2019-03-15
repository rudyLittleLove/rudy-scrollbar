export const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top'
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left'
  }
}

export function renderThumbStyle ({ move, size, bar }) {
  const style = {}
  // const scale = bar.axis === "Y" ? "scale(1, .8)" : "scale(.8, 1)";
  const translate = `translate${bar.axis}(${move}%)`

  style[bar.size] = size
  style.transform = translate
  style.msTransform = translate
  style.webkitTransform = translate

  return style
}

export function scrollTo (m, scroll, wrapDom, callback) {
  var reg = /^-?(\d+(\.\d+)?)$/

  let scrollSize =
    scroll === 'scrollTop'
      ? wrapDom.scrollHeight - wrapDom.clientHeight
      : wrapDom.scrollWidth - wrapDom.clientWidth

  m = reg.test(m) ? m : wrapDom[scroll]

  if (m < 0) {
    m = 0
  } else if (m > scrollSize) {
    m = scrollSize
  }

  let ca = m - wrapDom[scroll]
  let mVar = ca > 0 ? 1 : -1

  scrollToSpeed(m, mVar, scroll, scrollSize, Math.abs(ca) / 50, wrapDom, callback)
}

function scrollToSpeed (m, mVar, scroll, scrollSize, speed, wrapDom, callback) {
  let intM = wrapDom[scroll] + (speed += 1) * mVar

  intM = mVar === -1 ? (intM < m ? m : intM) : intM > m ? m : intM

  intM = intM > scrollSize ? scrollSize : intM
  intM = intM < 0 ? 0 : intM

  wrapDom[scroll] = intM

  if (intM !== m) {
    setTimeout(() => {
      scrollToSpeed(m, mVar, scroll, scrollSize, speed, wrapDom, callback)
    }, 10)
  } else {
    callback && callback()
  }
}

// export function scrollTo(x, y, wrapDom) {
//   var reg = /^(\d+(\.\d+)?)$/;

//   x = reg.test(x) ? x : wrapDom.scrollLeft;
//   y = reg.test(y) ? y : wrapDom.scrollTop;

//   let scrollWidth = wrapDom.scrollWidth - wrapDom.clientWidth;
//   if (x > scrollWidth) {
//     x = scrollWidth;
//   } else if (x < 0) {
//     x = 0;
//   }

//   let clientHeight = wrapDom.clientHeight - wrapDom.clientHeight;
//   if (y > clientHeight) {
//     y = clientHeight;
//   } else if (x < 0) {
//     y = 0;
//   }

//   let yVar = y - wrapDom.scrollTop > 0 ? 1 : -1;
//   let xVar = x - wrapDom.scrollLeft > 0 ? 1 : -1;

//   scrollToSpeed(y, x, yVar, xVar, 30, wrapDom);
// }

// function scrollToSpeed(y, x, yVar, xVar, speed, wrapDom) {
//   let intX = wrapDom.scrollLeft + (speed += 1) * xVar;
//   let intY = wrapDom.scrollTop + (speed += 1) * yVar;

//   intY = yVar === -1 ? (intY < y ? y : intY) : intY > y ? y : intY;
//   intX = xVar === -1 ? (intX < x ? x : intX) : intX > x ? x : intX;

//   wrapDom.scrollLeft = intX;
//   wrapDom.scrollTop = intY;

//   if (intY !== y || intX !== x) {
//     setTimeout(() => {
//       scrollToSpeed(y, x, yVar, xVar, speed, wrapDom);
//     }, 10);
//   }
// }
