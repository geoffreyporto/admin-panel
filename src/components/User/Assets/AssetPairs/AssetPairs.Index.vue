<template>
  <div class="assets-pairs-index">
    <div class="assets-pairs-index__heading-row">
      <h2>{{ "asset-pairs-index.asset-pairs-btn" | globalize }}</h2>

      <div class="assets-pairs-index__actions">
        <router-link
          class="assets-pairs-index__create-btn app__btn app__btn--iconed"
          :to="{ name: 'assets.assetPairs.new' }"
        >
          <i class="mdi mdi-plus" />
          {{ "asset-pairs-index.create-pare-btn" | globalize }}
        </router-link>
      </div>
    </div>

    <div class="assets-pairs-index__list-wrp">
      <asset-pair-list />
    </div>
  </div>
</template>

<script>
import AssetPairList from './components/AssetPairList'

export default {
  components: { AssetPairList },
}
</script>

<style lang="scss" scoped>
.assets-pairs-index__heading-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  max-width: 72rem;

  &:not(:first-of-type) {
    margin-top: 5.5rem;
  }

  & > h2 {
    margin-bottom: 0;
  }
}

.assets-pairs-index__actions {
  flex: 1;
  max-width: 17rem;
}

.assets-pairs-index__create-btn {
  font-weight: 600;
  text-decoration: none;

  &.app__btn {
    padding: 0.9rem;
  }

  & > i {
    display: flex;
    line-height: 1;
    margin-left: -1rem;
    margin-right: 0.7rem;
    font-size: 2.4rem;
  }
}
</style>
