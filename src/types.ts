export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export interface Channel {
	id: string;
	title: string;
	description: string;
	dj: string;
	djmail: string;
	genre: string;
	image: string;
	largeimage: string;
	xlimage: string;
	twitter: string;
	updated: string;
	playlists: { url: string; format: string; quality: string }[];
	preroll: unknown[];
	listeners: string;
	lastPlaying: string;
	songs: {
		title: string;
		artist: string;
		album: string;
		albumart: string;
		date: string;
	}[];
}
