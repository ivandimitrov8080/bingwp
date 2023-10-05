#!/usr/bin/env -S bun run
// @ts-ignore
import xdg from '@folder/xdg';
import download from 'image-downloader';
import fs from 'node:fs';
import dayjs from 'dayjs';

export const userDirs = xdg.userdirs.expand().dirs();
export const picturesDir = userDirs.XDG_PICTURES_DIR;
export const oldPicturesDir = `${picturesDir}/bg.old/`;
export const picPath = `${picturesDir}/bg.png`;

export const bing = async (): Promise<string> => {
	const bingUrl =
		'https://www.bing.com/HPImageArchive.aspx/?format=js&idx=0&n=1&mkt=en-US';
	return await fetch(bingUrl).then(res => res.json()).then(json => `https://bing.com${json["images"][0]["url"]}`);
};

export const backup = () => {
	if (!fs.existsSync(oldPicturesDir)) {
		fs.mkdirSync(oldPicturesDir);
	}
	fs.copyFileSync(
		picPath,
		`${oldPicturesDir}${dayjs().format('DD-MM-YYYY')}.png`,
	);
}

export const set = (path: string) => {
	fs.copyFileSync(
		path,
		picPath,
	);
}


export const dl = async (url: string): Promise<download.DownloadResult> => {
	backup()
	const options = {
		url,
		dest: `${picPath}`,
	};
	// @ts-ignore
	return download
		.image(options)
		.catch(err => console.error(err));
};
