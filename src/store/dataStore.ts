import { defineStore } from "pinia";
import axios from 'axios';

interface DataState {
    data: DataItem[];
    totalItems: number;
    itemsPerPage: number;
    offset: number;
    currentPage: number;
    location: string;
    term: string;
    price: string;
    limit: number;
    sort_by: string;
    radius: number;
    isLoading: boolean;
    singleData: null;
    reviewList: [];
    error: Error | null;
}

interface DataItem {
    id: number;
    name: string;
}

export const useDataStore = defineStore({
    id: 'data',
    state: (): DataState => ({
        data: [],
        totalItems: 0,
        itemsPerPage: 9,
        offset: 0,
        currentPage: 1,
        location: '',
        term: '',
        price: '',
        limit: 20,
        sort_by: '',
        radius: 0,
        isLoading: false,
        singleData: null,
        reviewList: [],
        error: null,
    }),
    actions: {
        async fetchData(params = {
            location: 'NYC',
            term: '',
            price: '',
            limit: 20,
            offset: 0,
            sort_by: '',
            radius: 0,
        }): Promise<void> {
            this.isLoading = true;
            try {
                const urlApi = `https://cors-anywhere.herokuapp.com/${import.meta.env.VITE_APP_API_URL}`;

                const response = await axios.get(urlApi + '/v3/businesses/search', {
                    params: {
                        location: params.location,
                        term: params.term,
                        price: params.price,
                        limit: params.limit,
                        offset: params.offset,
                        sort_by: params.sort_by,
                        radius: params.radius,
                    },
                    withCredentials: false,
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_APP_API_SCRETE}`,
                        'Content-Type': 'application/json',
                    },
                });

                this.data = response.data;
                this.totalItems = response.data.total;

            } catch (error) {
                this.error = error;
                console.error('Error Fatching data from Yelp api ' + error)
            } finally {
                this.isLoading = false;
            }
        },
        async fetchDataDetail(id_or_alias: null) {
            this.isLoading = true;
            try {
                const urlApi = `https://cors-anywhere.herokuapp.com/${import.meta.env.VITE_APP_API_URL}`;
                const response = await axios.get(urlApi + '/v3/businesses/' + id_or_alias, {
                    withCredentials: false,
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_APP_API_SCRETE}`,
                        'Content-Type': 'application/json',
                    },
                });

                this.singleData = response.data;

            } catch (error) {
                this.error = error;
                console.error('Error Detail data from Yelp api ' + error)
            } finally {
                this.isLoading = false;
            }
        },
        async fetchReviewList(id: null) {
            this.isLoading = true;
            try {
                const urlApi = `https://cors-anywhere.herokuapp.com/${import.meta.env.VITE_APP_API_URL}`;
                const response = await axios.get(urlApi + '/v3/businesses/' + id + '/reviews', {
                    withCredentials: false,
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_APP_API_SCRETE}`,
                        'Content-Type': 'application/json',
                    },
                });
                this.reviewList = response.data;
            } catch (error) {
                this.error = error;
                console.error('Error Review data from Yelp api ' + error)
            } finally {
                // this.isLoading = false;
            }
        }
    },
})