<script>
console.log("gm")
</script>
<style lang="scss">
$bg: rgb(255, 255, 255);

div#app {
    // 背景
    background: linear-gradient(0.25turn, rgb(255, 142, 142), rgb(142, 157, 255)) !important;
    color: #333 !important;

    // カード
    section.card-div[id] {
        >div.v-card {
            width: 100%;
            background-color: rgba($bg, 0.3) !important;
            border: 1px solid rgba($bg, 0.4);
            border-right-color: rgba($bg, 0.2);
            border-bottom-color: rgba($bg, 0.2);
            border-radius: 10px;
            -webkit-backdrop-filter: blur(20px);
            backdrop-filter: blur(20px);
            box-shadow: 0 5px 20px rgba(146, 79, 255, 0.5);
            color: #444 !important;

            em.em {
                background: linear-gradient(transparent 50%, rgb(216, 157, 253) 50%) !important;
            }

            i.v-icon {
                background-color: transparent !important;
            }

            div.v-list {
                background-color: transparent !important;
            }
        }
    }

}
</style>