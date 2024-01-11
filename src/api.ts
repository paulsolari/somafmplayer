import { useFetch } from '@/composables/fetch';
import type { Channel } from '@/types';

type ApiParams = Parameters<typeof useFetch>[0] & { baseUrl?: string };

const apiUrl = import.meta.env.VITE_SOMAFM_API_URL as string;

async function useApi<T>({
	baseUrl = apiUrl,
	url,
	method,
	responseHandler,
	headers,
	body,
}: ApiParams): Promise<T> {
	return await useFetch({
		url: baseUrl + url,
		method,
		responseHandler,
		headers,
		body,
	});
}

export const api = {
	async getChannels() {
		const { channels }: { channels: Channel[] } = await useApi({
			url: '/channels.json',
			method: 'get',
		});
		return channels;
	},

	async getChannelSongs(channelId: string) {
		const { songs }: { songs: Channel['songs'] } = await useApi({
			url: `/songs/${channelId}.json`,
			method: 'get',
		});
		return songs;
	},

	async getStreamUrl(playlistUrl: string) {
		const playlist: string = await useApi({
			baseUrl: '',
			url: playlistUrl,
			method: 'get',
			responseHandler: 'text',
		});
		const lines = playlist.split('\n');
		const regex = /https?:\/\//;
		const streamLine = lines.find((el: string) => el.match(regex)) ?? '';
		return streamLine.slice(streamLine.search(regex));
	},
};
