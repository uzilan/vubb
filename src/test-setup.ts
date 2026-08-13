import { config } from '@vue/test-utils'
import * as icons from '@coreui/icons'

config.global.provide = {
  ...config.global.provide,
  icons
}
