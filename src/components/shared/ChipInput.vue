<template>
  <div id="q-app">
    <div class="q-pa-md">
    <h6 v-if="title">{{title}}</h6>
      <div class="q-gutter-md row items-start">
        <div style="min-width: 250px; max-width: 300px">
          <q-select
            ref="myChipInput"
            :label="title"
            v-model="model"
            multiple
            use-chips
            autofocus
            use-input
            input-debounce="0"
            new-value-mode="add-unique"
            option-value="id"
            option-label="tagName"
            :options="options"
            stack-label
            hide-dropdown-icon
            lazy-rules
            @remove="deleteItem($event)"
            @filter="filterFn"
          >
          <!-- createValue is not called
          solving the change via watch 
          new-value is a param of q-select 
          @new-value="createValue"
           -->

          <template v-slot:option="scope">
          <q-item v-close-popup
            v-bind="scope.itemProps"
          >
            <q-item-section>
              <q-item-label v-html="scope.label"></q-item-label>
            </q-item-section>
           </q-item>
        </template>
          </q-select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { uid } from "quasar";
import { ref,watch } from "vue";
import { deepCopy, compare2Arrays,deleteElArFromeElAr } from "src/services/shared/utils";
export default {
  props: {title: String,
          content: Array,
          options: Array,
          settings: Object
          }
          ,
  setup(props, context) {
    const myChipInput = ref(null);
    let stringOptions = props.options;
    let content = []
    if(props.content){
       content = deepCopy(props.content);
   }
    let settings={}
    if (typeof props.settings.replaceSpace === 'undefined') 
    { settings["replaceSpace"] = false; } else
    {settings["replaceSpace"]= props.settings.replaceSpace}
    if(props.settings){
        if (props.settings.deleteSelection){
          settings["deleteSelection"]=true
        } else {
          settings["deleteSelection"]=false
        } 
    }
    const model = ref(content);
    const options = ref(stringOptions);
     
    watch([()=>{return [...props.options]}, ()=> {return[...model.value]}],([newOpt, newContent],[prevOpt, prevContent])=>{
      const difference = newContent.filter(
        x => !prevContent.includes(x)
      );
     if(newOpt.length != prevOpt.length){
        stringOptions=props.options
      }
      if(difference.length>0){
        const newElement = difference[0]
        if(settings.deleteSelection){
        console.log("Want to delete");
        stringOptions=deleteElArFromeElAr([newElement], stringOptions)
        createValue(newElement, settings)
        
      }   
      
      }

      if (myChipInput !== void 0) {
         myChipInput._rawValue.updateInputValue("");
         myChipInput._rawValue.focus()
      }
    }) //eof wathch
    
    
    const filterFn = (val, update) => {
      if (val === "") {
        update(() => {
          options.value = stringOptions;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        options.value = stringOptions.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    };
    const createValue = (val, settings) => {
      if(settings.replaceSpace){
          val = val.replace(/\s/g, "_");
      }
      // specific logic to eventually call done(...) -- or not
      context.emit("addTag", { tagName: val, id: "newtag" + uid() });
      //
    };
    const deleteItem = (event) => {
      context.emit("deleteTag", { value: event.value, mode: props.mode });
      stringOptions.push(event.value)
    };
    return {
      model,
      myChipInput,
      createValue,
      deleteItem,
      filterFn,
      options,
      stringOptions,
    };
  },
};
</script>
