import { createContext, useEffect, useState } from 'react';
import { Text } from 'ink';
import React from 'react';
import { bing, dl, oldPicturesDir, } from './lib.js';
import ImageSelector from './image-selector.js';

type Props = {
	url: string | undefined;
	interactive: boolean
};

export const AppContext = createContext({
})

export default function App({ url, interactive }: Props) {
	const [href, setHref] = useState(url)
	const [filename, setFilename] = useState("")

	const download = (url: string) => {
		const res = dl(url)
		res.then(({ filename }) => setFilename(filename))
	}

	useEffect(() => {
		if (!href && !interactive) {
			bing().then(res => setHref(res))
		}
	}, [])
	useEffect(() => {
		if (href) {
			download(href)
		}
	}, [href])
	return (
		<AppContext.Provider value={{
		}}>
			{interactive ? (
				<>
					<ImageSelector directory={oldPicturesDir} />
				</>
			) :
				<Text>
					Saved picture to: <Text color="green">{filename}</Text>
				</Text>
			}
		</AppContext.Provider>
	);
}
