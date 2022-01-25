# Quasar App (tagsearch)

This app is a demo for an autocomplete searcher.
It shows as an example howto programm a search div with an chipInput which gets its data from an array given as property to the component. You can change the array with tags from autside the component 

### Possible Props 

          title= "Example" 
          v-on:addTag="addTag($event)"
          v-on:deleteTag="deleteTag($event)"
          :options="displayTags"
          :settings="{ deleteSelection: true }"

displayTags are the tags which are to be display. They are reactive.

###### settings 
delete deleteSelection: true deletes a selected item from the dispayed List, when it is choosen to the selection and adds it again when it is deleted from the resultlist.

### events 
##### addTag 
fired when a tag is added to the result List with the tag as event

#### deleteTag
fired when a tag is deleted with the tag as event

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Licence
MIT



