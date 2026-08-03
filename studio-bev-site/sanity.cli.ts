import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'utlh4le8',
    dataset: 'production',
  },
  /** Hosted Studio at https://bev-site.sanity.studio — no local install needed to edit. */
  studioHost: 'bev-site',
  deployment: {
    appId: 'tcomibxstvl2zzadl37ye9xb',
    /**
     * Off deliberately. Auto-updates fetch the Studio bundle from sanity-cdn.com at
     * build time, which the build environment cannot reach. With this false the
     * Studio is built from the versions pinned in package.json — reproducible, but
     * upgrades need a `npm update` and a redeploy rather than arriving on their own.
     */
    autoUpdates: false,
  },
})
