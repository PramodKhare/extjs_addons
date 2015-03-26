Ext.define('Application.view.item.List', {
  extend: 'Ext.tree.Panel',
  // Shorthand name for this object
  alias: 'widget.itemList',
  // Item id - used by Ext.getCmp() method
  title: 'Items',
  // Content provider to this component. Data
  // will be fetched and displayed on startup
  store: 'Items',
  // Disable display of that nasty blank spot
  rootVisible: false,
  // Override default displayed property name - change it from "text" to "name"
  displayField: 'name',
  minWidth: 150
  // IMPORTANT:
  // Trees with defined stores and no additional items do 
  // not require any "layout" parameter here
});