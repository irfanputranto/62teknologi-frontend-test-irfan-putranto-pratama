<script setup lang="ts">
import CardVue from "../components/Card.vue";
import HeroVue from "../components/Hero.vue";
import PaginationVue from "../components/Pagination.vue";
import SelectVue from "../components/Select.vue";
import { ref, onMounted } from "vue";
import { useDataStore } from '../store/dataStore';
import ButtonVue from "../components/Button.vue";
import InputFilter from "../components/Input.vue";
import LoadingVue from "../components/Loading.vue";


const store = useDataStore();
const location = ref('United States');
const filterInputData = ref('');

const optionSortBy = ref('Sort By : ');
const sortByList = ref([
  {
    'label': 'Best Match',
    'value': 'best_match',
  },
  {
    'label': 'Rating',
    'value': 'rating',
  },
  {
    'label': 'Review Count',
    'value': 'review_count',
  },
  {
    'label': 'Distance',
    'value': 'distance',
  }
]);

const listLocation = ref([
  { "label": "United States", "value": "United States" },
  { "label": "Argentina", "value": "Argentina" },
  { "label": "Australia", "value": "Australia" },
  { "label": "Austria", "value": "Austria" },
  { "label": "Belgium", "value": "Belgium" },
  { "label": "Brazil", "value": "Brazil" },
  { "label": "Canada", "value": "Canada" },
  { "label": "Chile", "value": "Chile" },
  { "label": "Czech Republic", "value": "Czech Republic" },
  { "label": "Denmark", "value": "Denmark" },
  { "label": "Finland", "value": "Finland" },
  { "label": "France", "value": "France" },
  { "label": "Germany", "value": "Germany" },
  { "label": "Hong Kong", "value": "Hong Kong" },
  { "label": "Italy", "value": "Italy" },
  { "label": "Japan", "value": "Japan" },
  { "label": "Malaysia", "value": "Malaysia" },
  { "label": "Mexico", "value": "Mexico" },
  { "label": "Netherlands", "value": "Netherlands" },
  { "label": "New Zealand", "value": "New Zealand" },
  { "label": "Norway", "value": "Norway" },
  { "label": "Philippines", "value": "Philippines" },
  { "label": "Poland", "value": "Poland" },
  { "label": "Portugal", "value": "Portugal" },
  { "label": "Republic of Ireland", "value": "Republic of Ireland" },
  { "label": "Singapore", "value": "Singapore" },
  { "label": "Spain", "value": "Spain" },
  { "label": "Sweden", "value": "Sweden" },
  { "label": "Switzerland", "value": "Switzerland" },
  { "label": "Taiwan", "value": "Taiwan" },
  { "label": "The Netherlands", "value": "The Netherlands" },
  { "label": "Turkey", "value": "Turkey" },
  { "label": "United Kingdom", "value": "United Kingdom" },
]);

const searchBy = ref([
  { "label": "Term", "value": "term" },
  { "label": "Radius", "value": "radius" },
  { "label": "Price", "value": "price" },
]);
const searchByValue = ref('term');
const handlerSearchBy = (event: CustomEvent) => {
  const { value } = event.detail;
  searchByValue.value = value;
}

const CountryValue = ref();
const handlerCountry = (event: CustomEvent) => {
  const { value } = event.detail;
  CountryValue.value = value;
}

const inputNameFilter = ref('');
const handlerInputFilter = (value: string) => {
  inputNameFilter.value = value;
}

const handlerSortBy = (event: CustomEvent) => {
  const { value } = event.detail;
  store.currentPage = 1;

  dataBusiness({
    location: location.value,
    limit: store.itemsPerPage,
    sort_by: value,
  });
}

const handlePageChange = ({ offset, limit }) => {
  store.currentPage = Math.floor(offset / store.itemsPerPage) + 1;

  dataBusiness({
    location: location.value,
    offset: offset,
    limit: limit,
  })
}


const filterDatas = () => {
  store.currentPage = 1;
  const countrysData = CountryValue.value;

  if (countrysData) {
    location.value = countrysData;
  }

  if (inputNameFilter.value) {
    filterInputData.value = inputNameFilter.value;
  }

  if (searchByValue.value == 'term') {
    dataBusiness({
      location: location.value,
      term: filterInputData.value,
      limit: store.itemsPerPage,
    });
  }

  if (searchByValue.value == 'radius') {
    dataBusiness({
      location: location.value,
      limit: store.itemsPerPage,
      radius: filterInputData.value,
    });
  }

  if (searchByValue.value == 'price') {
    dataBusiness({
      location: location.value,
      limit: store.itemsPerPage,
      price: filterInputData.value,
    });
  }
}

const dataBusiness = (params = {
  location: '',
  term: '',
  price: '',
  limit: 0,
  offset: '',
  sort_by: '',
  radius: 0,
}) => {
  store.fetchData({
    location: params.location,
    term: params.term,
    price: params.price,
    limit: params.limit,
    offset: params.offset,
    sort_by: params.sort_by,
    radius: params.radius,
  });
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

onMounted(() => {
  scrollToTop();
  
  dataBusiness({
    location: location.value,
    limit: store.itemsPerPage,
    offset: store.offset,
  });
});
</script>

<template>
  <HeroVue>
    <section>
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <form action="#">

            <div class="flex flex-col lg:flex-row relative">
              <select-vue :options="searchBy" @option-selected="handlerSearchBy" :class="'w-full mb-2 lg:mr-2'" />
              <input-filter :placeholder="'Enter search'" @input-text-custom="handlerInputFilter"
                :class="'w-full lg:w-[120%] max-w-xs mb-2 mr-2 lg:ml-4'" />
              <select-vue :options="listLocation" @option-selected="handlerCountry"
                :class="'mb-2 w-full lg:mr-2 lg:ml-20'" />

              <button-vue class="btn btn-success text-white" @click.prevent="filterDatas()" :class="'lg:ml-24'"><font-awesome-icon
                  icon="search" /></button-vue>
            </div>

          </form>
        </div>
      </div>
    </section>
  </HeroVue>

      <div class="flex items-center mt-3 sm:mx-auto ml-[13rem] md:mr-96 lg:mr-[30rem] xl:mr-[22rem]">
        <div class="  lg:ml-auto">
          <select-vue :label="optionSortBy" :options="sortByList" @option-selected="handlerSortBy"
            :class="'p-2 w-full'" :class-title="''" />
        </div>
      </div>

  <section class="min-h-screen">

    <div class="container mt-5 ml-2 lg:mx-auto">
      <!-- loading  -->
      <div class="flex" v-if="store.isLoading">
        <LoadingVue />
      </div>
      <!-- loading  -->

      <!-- data list product business -->
      <div v-if="!store.isLoading && !store.error">
        <div class="flex flex-wrap justify-center">
          <CardVue v-for="(business) in store.data.businesses" 
            :key="business.id" :title="business.name"
            :location="business.location.address1"
            :badge="business.price" :alt="business.alias"
            :description="'A brief explanation of the business and products offered.'"
            :image="business.image_url"
            :categories="business.categories" :link-name="'details'" :link-params="{ id: business.id }"
            class="mt-5 mr-5 sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/4 lg:mr-5" />
        </div>

        <div class="text-center mt-5">
          <PaginationVue :total-items="store.totalItems" :items-per-page="store.itemsPerPage" :offset="store.offset"
            @page-change="handlePageChange"></PaginationVue>
        </div>
      </div>
  </div>
</section></template>

