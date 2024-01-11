import { defineStore } from 'pinia';
import { api } from '@/api.ts';
import { type Channel } from '@/types.ts';

export const useMainStore = defineStore('main-store', {
	state: () => ({
		pageLoading: true,
		mobileChannelsOpen: false,
		channels: [] as Channel[],
		currentChannel: null as Channel | null,
		currentChannelSongs: [] as Channel['songs'],
		streamUrl: '',
	}),

	actions: {
		async setCurrentChannel(channel: Channel) {
			if (this.currentChannel?.id === channel.id) return;
			this.currentChannel = { ...channel, songs: this.currentChannelSongs };
			this.currentChannel.songs = await api.getChannelSongs(channel.id);
			this.currentChannelSongs = this.currentChannel.songs;
			if (channel.playlists.length > 0) {
				this.streamUrl = await api.getStreamUrl(channel.playlists[0].url);
			}
		},
	},
});
