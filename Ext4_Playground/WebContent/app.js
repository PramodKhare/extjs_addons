Ext.application({
    name: 'DND',

    launch: function() {

        var overrides = {
            startDrag: function(e) {
                //shortcut to access our element later
                if (!this.el) {
                    this.el = Ext.get(this.getEl());
                }
                //add a css class to add some transparency to our div
                this.el.addCls('selected');
                //when we drop our item on an invalid place  we need to return it to its initial position
                this.initialPosition = this.el.getXY();
            },
            onDrag: function(e) {
                this.el.moveTo(e.getPageX() - 32, e.getPageY() - 32);
            },
            onDragEnter: function(e, id) {
                Ext.fly(id).addCls('valid-zone');
            },
            onDragOver: function(e, id) {
                Ext.fly(id).addCls('valid-zone');
            },
            onDragOut: function(e, id) {
                console.log('onDragOut');
            },
            onDragDrop: function(e, id) {
                // change the item position to absolute
                this.el.dom.style.position = 'absolute';
                //move the item to the mouse position
                this.el.moveTo(e.getPageX() - 32, e.getPageY() - 32);
                Ext.fly(id).removeCls('valid-zone');

            },
            onInvalidDrop: function() {
                this.el.removeCls('valid-zone');
                this.el.moveTo(this.initialPosition[0], this.initialPosition[1]);
            },
            endDrag: function(e, id) {
                this.el.removeCls('selected');
                //Ext.fly(id).removeCls('drop-target');
                this.el.highlight();
            }
        };

        var tables = Ext.get('tables').select('div');
        Ext.each(tables.elements, function(el) {
            var dd = Ext.create('Ext.dd.DD', el, 'tablesDDGroup', {
                isTarget: false
            });
            Ext.apply(dd, overrides);
        });

        //we set the drop targets
        var mainTarget = Ext.create('Ext.dd.DDTarget', 'mainRoom', 'tablesDDGroup', {
            ignoreSelf: false
        });

    }
});