<template>
    <Card>
        <template #title>
            パスワードを入力してください
        </template>
        <ItemFormInput :form-setting="form" />
    </Card>
    <card-array-by-andml v-if="mainandml" :andml="mainandml" />
</template>
  
<script setup lang="ts">
import secrets from "@/assets/secret.json"
import { webcrypto } from "crypto";

const { $templateText } = useNuxtApp()
const { params } = useRoute()

const pagetitle = ref("")
const mainandml = ref("")
const id: string = Array.isArray(params.id) ? params.id[0] : params.id
const getBufferFromData = (obj: BufferData): Buffer => Buffer.from(new Uint8Array(obj.data).buffer)

const form = ref({
    name: "password",
    label: "パスワード",
    type: "string",
    value: ""
} as FormSettingString)

// const decryptData = async (obj: BufferData): string => {
//     const dec = new TextDecoder();
//     const key = await webcrypto.generateAesKey()
//     const plaintext = await webcrypto.subtle.decrypt({
//         name: 'AES-CBC',
//         iv: getBufferFromData(secrets.iv as BufferData),
//     }, form.value.value, obj.data);

//     return dec.decode(plaintext);
// }

const secret: Secret | undefined = (secrets as SecretJson).list.find(blo => blo.id === id)

// const decryptPage = () => {
//     if (!(
//         secret
//         && secret.title && secret.title.type === "Buffer"
//         && secret.andml && secret.andml.type === "Buffer"
//     )) {
//         showError("")
//     } else {
//         pagetitle.value = decryptData(secret.title)
//         mainandml.value = decryptData(secret.andml)

//     }
// }

</script>