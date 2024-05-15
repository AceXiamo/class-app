export type Vector ={
  x: number
  y: number
}

export default class cropperUtils {
  // distance between two coordinate
  static calcLen (v:Vector) {
    return Math.sqrt(v.x * v.x + v.y * v.y)
  }

  // angle of the two vectors
  static calcAngle (a:Vector, b:Vector) {
    const l = cropperUtils.calcLen(a) * cropperUtils.calcLen(b); let cosValue; let angle
    if (l) {
      cosValue = (a.x * b.x + a.y * b.y) / l
      angle = Math.acos(Math.min(cosValue, 1))
      angle = a.x * b.y - b.x * a.y > 0 ? -angle : angle
      return angle * 180 / Math.PI
    }
    return 0
  }

  // generate a random string
  static generateCanvasId () {
    const seeds = 'abcdefghijklmnopqrstuvwxyz'
    const arr = seeds.split('').concat(seeds.toUpperCase().split('')).concat('0123456789'.split(''))
    let m = arr.length; let i
    while (m) {
      i = Math.floor(Math.random() * m--)
      const temp = arr[m]
      arr[m] = arr[i]
      arr[i] = temp
    }
    return arr.slice(0, 16).join('')
  }

  /**
   * 转化base64为blob
   * @param dataURI
   * @returns
   */
  static dataURItoBlob (dataURI:string) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    const byteString = atob(dataURI.split(',')[1])

    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    // write the ArrayBuffer to a blob, and you're done
    const bb = new Blob([ab], { type: mimeString })
    return URL.createObjectURL(bb)
  }
}
