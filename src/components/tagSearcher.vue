<template>
  <q-page class="col-4 col-md-6 items-center">
    <div class="row">
      <q-card class="row q-ma-xl">
        <chip-input
          v-on:addTag="addTag($event)"
          v-on:deleteTag="deleteTag($event)"
          ref="tags"
          :options="displayTags"
          :settings="{ deleteSelection: true }"
        >
        </chip-input>
        <!-- receive Tags wird bei der Initialisierung von tag-cloud geschickt"
    und beinhaltet alle Tags - also das Suchergebnis
    sendTag bei der Auswahl eines Tags -->
        <q-card-actions>
          <q-btn @click="search()" label="search" />
          <q-btn @click="change()" label="changeData" />
        </q-card-actions>

      </q-card>
    </div>
  </q-page>
</template>
<script>
/** Die Events wie z.B. TookIt werden durchgereicht
 * Die die Verarbeitungslogik der Parentkomponente obliegt
 * (deswegen keine direkte Verarbeitung im Store)
 **/

import { deleteElArFromeElAr } from "src/services/utils";
export default {
  components: {
    chipInput: require("components/shared/ChipInput.vue").default,
  },

  props: {
    kind: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      showFilename: false, //qtoggle or qCheckbox have no value property ????
      litems: [],
      searchText: "",
      url: "",
      showFileName: false,
      searched: false,
      tags_not_found: [],
      searchTags: [],
      displayTags: ["car", "van", "bike","horse"], //from the computed tags
      changeData1 : ["USA", "China", "Taiwan", "Germany"],
      changeData2 : ["car", "van", "bike","horse"],
      toggle: "1"
    };
  },


  methods: {
    addTag(tag) {
      console.log("tag ----> addTag");
      console.log(tag);
      console.log("End of ------- addTag");
      this.searchTags.push(tag);
    },
    deleteTag(tag) {
      console.log("delete Tag");
      console.log(tag);
      console.log("End of ------- deleteTag");
      deleteElArFromeElAr([tag], this.searchTags);
    },

    async search() {
      const searchAr = this.searchTags;
      console.log("searcher ------->>>>>>> reached with :");
      console.log(searchAr);
      //place your searchlogic here
    },
    change() {
      if (this.toggle=="1"){
        this.toggle="2"
          this.displayTags=this.changeData1
      }else{this.toggle="1"
          this.displayTags = this.changeData2
      }
    
    },

  },
};
</script>

<style lang="scss" scoped>
.fixit {
  max-height: 60px;
}
</style>
