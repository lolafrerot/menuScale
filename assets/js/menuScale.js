/*!
 * MenuScale v1
 * by E-magineurs
 *
 */

// Uses Node, AMD or browser globals to create a module.
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.menuScale = factory(root.jQuery);
    }
}(this, function ($) {

    function menuScale(options) {
        this.init();

        // options
        this.options = $.extend({}, this.constructor.defaults);
        this.option(options);

    }
    menuScale.defaults = {
        element: 'nav',
        menuButton: 'button',
        direction: "top left",
        submenuTitle: "open submenu",
        extracontent: false
    }
    menuScale.prototype.option = function (options) {
        $.extend(this.options, options);
        //console.log(this.options);
    }
    menuScale.prototype.init = function () {
        var self = this;

        $(document).ready(function () {
            self.build();
        });
        //console.log(self.options);
    }
    menuScale.prototype.build = function () {

        var self = this;
        this.$isOpen = false;

        this.$menuButton = $(self.options.menuButton);
        this.$menuCont = $(self.options.element);
        this.$menuCont.addClass('menuScale').addClass(self.options.direction).wrapInner('<div class="navcontainer"></div>');

        this.$menu = this.$menuCont.children().children('ul');
        this.$subMenu = this.$menu.children('li').find('ul');
        if(this.$subMenu.length == 0){
            this.$menu.addClass('no-children')
        }
        $('body').addClass(self.options.direction).addClass('menuScaleBody');       
        
        self.createOpenningButtons(self.options.submenuTitle);
        this.$subMenuButton = this.$subMenu.prev();
        this.$menuCont.addClass('first');
        
        if(self.options.direction == "top left"){
            this.$direction = "0% 0%"
        }
        else if(self.options.direction == "top right"){
            this.$direction = "100% 0%"
        }
        else if(self.options.direction == "bottom right"){
            this.$direction = "100% 100%"
        }
        else {
            this.$direction = "0% 100%"
        }
        
        //events handlers
        this.$menuButton.on('click', function (e) {

            if (self.$isOpen == false) {
                self.openMenu();

            } else {                
                self.closeMenu();
            }

        });

        this.$subMenuButton.on('click', function () {
            
            
            if ($(this).attr('aria-expanded') == 'false') {

                self.openSubMenu($(this).parent().children('ul'))

                $(this).attr('aria-expanded', true)
            } else {

                self.closeSubMenu($(this).parent().children('ul'))

                $(this).attr('aria-expanded', false)
            }
        })

        let plop = this;
        $(document).on("click", function (event) {
            let self = plop;
            if ($(event.target).closest(self.$menuCont.parents('header')).length === 0) {
                self.closeMenu();
            }
        });
    }

    menuScale.prototype.openMenu = function () {
        let self = this;
        $('body').addClass('overflow');
        self.$isOpen = true;
        self.$menuCont.addClass('open');
        TweenMax.to(self.$menuCont, 0.5,             
            {
                transformOrigin: self.$direction,
                scale: 1,
                opacity: 1,
                ease: "expo",
                display:'block' 
            }
        )
        
        self.$menuButton.addClass('open');
        self.$menuButton.attr('aria-expanded', true) 
        
        if (self.$menuCont.hasClass('first')){
            
            self.$menuCont.removeClass('first').addClass('second');
        }

    }
    menuScale.prototype.closeMenu = function () {
        let self = this;
        self.$isOpen = false;
        $('body').removeClass('overflow');
        //self.$menuCont.removeClass('open');
        TweenMax.to(self.$menuCont, 0.5,             
            {
                transformOrigin: self.$direction,
                scale: 0,
                opacity: 0,
                ease: "expo",
                display:'none'
            }
        )
        self.$menuButton.removeClass('open');
        self.$menuButton.attr('aria-expanded', false)
        self.closeAllSubMenu();
    }

    menuScale.prototype.openSubMenu = function (elem) {
        let self = this;
        let openedMenus = elem.parent('li').parent('ul').children('.item-has-children');
        openedMenus.each(function () {
            self.closeSubMenu($(this).children('ul'));
            $(this).children('button').attr('aria-expanded', 'false')
        })
        elem.addClass('open');
         elem.parent().addClass('opened');
    }
    menuScale.prototype.closeSubMenu = function (elem) {
        let self = this;
        elem.removeClass('open');
        elem.parent().removeClass('opened');
        //this.$menuCont.removeClass('open');
    }
    menuScale.prototype.closeAllSubMenu = function () {
        let self = this;

        this.$subMenu.each(function () {
            self.closeSubMenu($(this));
            $(this).parent().children('button').attr('aria-expanded', 'false')
        })
    }
    menuScale.prototype.createOpenningButtons = function (label) {
        let self = this;
        
        self.$subMenu.each(function () {
            $(this).parent().addClass('item-has-children');
            $('<button aria-expanded="false"><span class="sr-only">'+label+'</span>+</button>').insertBefore($(this))
        })
    }
    return menuScale;
}));
