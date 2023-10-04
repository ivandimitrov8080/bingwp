import React, { useState, useEffect, } from 'react';
import { Text, Box, useInput } from 'ink';
import fs from 'fs';
import path from 'path';
import { set } from './lib.js';
import cp from 'child_process'

type Props = {
	directory: string
}

const ImageSelector = ({ directory }: Props) => {
	const [files, setFiles] = useState([] as string[]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [img, setImg] = useState("")

	useEffect(() => {
		fs.readdir(directory, (_err, allFiles) => {
			const imageFiles = allFiles.filter(file => {
				const ext = path.extname(file).toLowerCase();
				return ['.jpg', '.jpeg', '.png'].includes(ext);
			});

			setFiles(imageFiles);
		});
	}, [directory]);

	useEffect(() => {
		setImg(`${directory}/${files[selectedIndex]}`)
	}, [selectedIndex])

	useInput((_input, key) => {
		if (key.upArrow && selectedIndex > 0) {
			setSelectedIndex(selectedIndex - 1);
		}

		if (key.downArrow && selectedIndex < files.length - 1) {
			setSelectedIndex(selectedIndex + 1);
		}

		if (key.return) {
			set(`${directory}/${files[selectedIndex]}`)
		}
	});

	return (
		<Box flexDirection="column">
			<Text>Select an image in {directory}:</Text>
			{files.map((file, index) => (
				<Text key={file}>
					{selectedIndex === index ? '>' : ' '} {file}
				</Text>
			))}
			<Text>
				{cp.execSync(`kitty icat ${img}/`)}
			</Text>
		</Box >
	);
};

export default ImageSelector;

