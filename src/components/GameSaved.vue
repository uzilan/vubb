<template>
  <CToaster class="p-3" placement="top-center">
    <CToast :autohide="false" class="align-items-center" v-if="gamesStore.showSaved" visible>
      <CToastBody>
        {{ $t('message.saved') }}
        <div class="mt-2 pt-2 border-top">
          <CButton type="button" color="primary" size="sm" @click="gamesStore.showSaveDone">
            {{ $t('message.ok') }}
          </CButton>
          <CToastClose as="CButton" color="secondary" size="sm" class="ms-1"
            >{{ $t('message.close') }}
          </CToastClose>
        </div>
      </CToastBody>
    </CToast>
  </CToaster>
</template>

<script setup lang="ts">
import { CToast, CToastBody, CToastClose, CToaster } from '@coreui/vue/dist/esm/components/toast'
import { CButton } from '@coreui/vue/dist/esm/components/button'
import { useGamesStore } from '@/stores/GamesStore'

const gamesStore = useGamesStore()
</script>

<style scoped></style>
