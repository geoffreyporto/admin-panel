import SelectField from '@comcom/fields/SelectField'
import { CollectionLoader } from '@/components/common'

import { REQUEST_STATES, ASSET_POLICIES } from '@/constants'

import localize from '@/utils/localize'

import config from '@/config'
import { ApiCallerFactory } from '@/api-caller-factory'
import { ErrorHandler } from '@/utils/ErrorHandler'

export default {
  components: {
    SelectField,
    CollectionLoader,
  },

  data () {
    return {
      REQUEST_STATES,
      list: [],
      listCounter: {
        pending: null,
        approved: null,
      },
      assets: [''],
      isNoMoreEntries: false,
      isLoaded: false,
      isRejectionModalShown: false,
      itemToReject: null,
      rejectForm: {
        reason: '',
      },
      filters: {
        state: REQUEST_STATES.approved,
        asset: '',
      },
    }
  },

  watch: {
    'filters.state' () { this.reloadCollectionLoader() },

    'filters.asset' () { this.reloadCollectionLoader() },
  },

  async created () {
    await this.getAssets()
  },

  methods: {
    localize,

    async getAssets () {
      try {
        const { data } = await ApiCallerFactory
          .createStubbornCallerInstance()
          .stubbornGet('/v3/assets')
        this.assets = this.assets.concat(
          data
            .filter(item => (item.policies.value & ASSET_POLICIES.baseAsset))
            .sort((assetA, assetB) => assetA.id > assetB.id ? 1 : -1)
            .map(asset => asset.id)
        )
      } catch (error) {
        ErrorHandler.processWithoutFeedback(error)
      }
    },

    async getList () {
      this.isLoaded = false
      let response = {}
      try {
        response = await ApiCallerFactory
          .createCallerInstance()
          .getWithSignature('/v3/create_issuance_requests', {
            filter: {
              reviewer: config.MASTER_ACCOUNT,
              state: this.filters.state,
              'request_details.asset': this.filters.asset,
            },
            page: {
              order: 'asc',
            },
            include: ['request_details'],
          })
      } catch (error) {
        ErrorHandler.processWithoutFeedback(error)
      }
      this.isLoaded = true
      return response
    },

    // TODO: Count issuance request
    getListCounter (response) {
      if (response) {
        this.listCounter.pending = response._rawResponse.data
          ._embedded.meta.count.pending
        this.listCounter.approved = response._rawResponse.data
          ._embedded.meta.count.approved
      }
    },

    setList (data) {
      this.list = data
    },

    async extendList (data) {
      this.list = this.list.concat(data)
    },

    reloadCollectionLoader () {
      this.$refs.collectionLoaderBtn.loadFirstPage()
    },
  },
}
