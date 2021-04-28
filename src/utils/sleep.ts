export async function sleep (time: number) {
  return await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export async function randomSleep(minSecond: number, maxSecond: number) {
  const time = (minSecond + Math.random() * (maxSecond - minSecond)) * 1000
  return await sleep(time)
}
