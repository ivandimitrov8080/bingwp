import xdg from '@folder/xdg'
import download from 'image-downloader'
import fs from 'node:fs'
import dayjs from 'dayjs'

const userDirs = xdg.userdirs.expand().dirs()
const picturesDir = userDirs.XDG_PICTURES_DIR_DIR
const oldPicturesDir = `${picturesDir}/bg.old/`
const picPath = `${picturesDir}/bg.png`

const getBingImageUrl = async () => {
    const bingUrl = "https://www.bing.com/HPImageArchive.aspx/?format=js&idx=0&n=1&mkt=en-US"
    const json = await fetch(bingUrl).then(res => res.json())
    const image = json["images"][0]["url"]
    return "https://bing.com" + image
}

if (!fs.existsSync(oldPicturesDir)) {
	fs.mkdirSync(oldPicturesDir)
}
fs.copyFileSync(picPath, `${oldPicturesDir}${dayjs().format("DD-MM-YYYY")}.png`)

const options = {
  url: await getBingImageUrl(),
  dest: `${picPath}`,
};

// @ts-ignore
download.image(options)
  .then(({ filename }) => {
    console.log('Saved to', filename);
  })
  .catch((err) => console.error(err));

