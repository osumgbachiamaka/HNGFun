/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","ojs/ojcomponentcore","ojs/ojdvt-base","ojs/internal-deps/dvt/DvtDiagram","ojs/ojkeyset","ojs/ojdatasource-common"],function(e,t,n,o,r){e.ConversionDiagramDataSource=function(t,n){this.childDataCallback=n?n.childData:null,e.ConversionDiagramDataSource.superclass.constructor.call(this,t)},e.Object.createSubclass(e.ConversionDiagramDataSource,e.DiagramDataSource,"oj.ConversionDiagramDataSource"),e.ConversionDiagramDataSource.prototype.getData=function(e){if(e){var t=e.nodes;if(void 0===t&&this.childDataCallback){var n=this.childDataCallback(e);return Promise.resolve(n).then(function(e){return Promise.resolve({nodes:e})},function(e){return Promise.resolve({nodes:[]})})}return Promise.resolve({nodes:t})}if(this.data){var o=this.data.nodes,r=this.data.links;return o instanceof Function&&(o=o()),r instanceof Function&&(r=r()),Promise.all([o,r]).then(function(e){return Promise.resolve({nodes:e[0],links:e[1]})},function(e){return Promise.resolve({nodes:[],links:[]})})}return Promise.resolve(null)},e.ConversionDiagramDataSource.prototype.getChildCount=function(e){if(e){var t=e.nodes;return Array.isArray(t)?t.length:void 0===t&&this.childDataCallback?-1:0}return-1},e.ConversionDiagramDataSource.prototype.getDescendantsConnectivity=function(e){return"unknown"},e.DiagramUtils=function(){},e.DiagramUtils.getLayout=function(t){return function(n){if(t.nodes&&n.getNodeCount()>0)for(var o=e.DiagramUtils._dataArrayToMap(t.nodes),r=t.nodeDefaults&&t.nodeDefaults.labelLayout?t.nodeDefaults.labelLayout:null,a=0;a<n.getNodeCount();a++){var i=n.getNodeByIndex(a),s=o[i.getId()];e.DiagramUtils._positionChildNodes(i.getChildNodes(),s?s.nodes:null,n,r),e.DiagramUtils._positionNodeAndLabel(i,s,n,r)}if(t.links&&n.getLinkCount()>0)for(var l=e.DiagramUtils._dataArrayToMap(t.links),d=t.linkDefaults&&t.linkDefaults.path?t.linkDefaults.path:null,p=(r=t.linkDefaults&&t.linkDefaults.labelLayout?t.linkDefaults.labelLayout:null,0);p<n.getLinkCount();p++){var u=n.getLinkByIndex(p),c=l[u.getId()];c&&c.path?u.setPoints(c.path):d&&d instanceof Function&&u.setPoints(d(n,u)),c&&c.coordinateSpace&&u.setCoordinateSpace(c.coordinateSpace),c&&c.labelLayout?e.DiagramUtils._setLabelPosition(u,c.labelLayout):r&&r instanceof Function&&e.DiagramUtils._setLabelPosition(u,r(n,u))}if(t.viewport){var g=t.viewport;g instanceof Function?n.setViewport(g(n)):n.setViewport(g)}}},e.DiagramUtils._dataArrayToMap=function(e){var t={};if(e)for(var n=0;n<e.length;n++)t[e[n].id]=e[n];return t},e.DiagramUtils._positionChildNodes=function(t,n,o,r){if(t&&n)for(var a=e.DiagramUtils._dataArrayToMap(n),i=0;i<t.length;i++){var s=t[i],l=a[s.getId()];e.DiagramUtils._positionChildNodes(s.getChildNodes(),l?l.nodes:null,o,r),e.DiagramUtils._positionNodeAndLabel(s,l,o,r)}},e.DiagramUtils._positionNodeAndLabel=function(t,n,o,r){t&&n&&(t.setPosition({x:n.x,y:n.y}),n.labelLayout?e.DiagramUtils._setLabelPosition(t,n.labelLayout):r&&r instanceof Function?e.DiagramUtils._setLabelPosition(t,r(o,t)):r&&e.DiagramUtils._setLabelPosition(t,r,t.getPosition()))},e.DiagramUtils._setLabelPosition=function(e,t,n){n=n||{x:0,y:0},e.setLabelPosition({x:t.x+n.x,y:t.y+n.y});var o=t.rotationPointX,r=t.rotationPointY;isNaN(o)||isNaN(r)||e.setLabelRotationPoint({x:o+n.x,y:r+n.y}),e.setLabelRotationAngle(t.angle),e.setLabelHalign(t.halign),e.setLabelValign(t.valign)},e.__registerWidget("oj.ojDiagram",t.oj.dvtBaseComponent,{widgetEventPrefix:"oj",options:{animationOnDataChange:"none",animationOnDisplay:"none",dnd:{drag:null,drop:null},expanded:new e.ExpandedKeySet,selection:null,selectionMode:"none",panning:"none",panDirection:"auto",tooltip:{renderer:null},zooming:"none",minZoom:0,maxZoom:1,hiddenCategories:[],hoverBehavior:"none",highlightedCategories:[],highlightMatch:"all",nodeHighlightMode:"node",linkHighlightMode:"link",renderer:null,hoverRenderer:null,selectionRenderer:null,focusRenderer:null,zoomRenderer:null,data:null,linkProperties:null,nodeProperties:null,promotedLinkBehavior:"lazy",styleDefaults:{hoverBehaviorDelay:200,nodeDefaults:{labelStyle:{},showDisclosure:"on",icon:{pattern:"none",shape:"circle",width:10,height:10,svgClassName:""}},linkDefaults:{svgClassName:"",width:1,labelStyle:{},startConnectorType:"none",endConnectorType:"none"},promotedLink:{color:"#778999",svgClassName:"",width:1,startConnectorType:"none",endConnectorType:"none"}},touchResponse:"auto",beforeExpand:null,expand:null,beforeCollapse:null,collapse:null},_InitOptions:function(e,t){this._super(e,t);var n=this.options.styleDefaults;this.options.styleDefaults=n},_ProcessOptions:function(){this._super(),this.options._logger=e.Logger,this.options._templateFunction&&(this.options.renderer=this._GetTemplateDataRenderer(this.options._templateFunction,"node")),this.options.renderer&&(this.options._contextHandler=this._getContextHandler()),this.options.nodes&&(this.options.nodeProperties=this.options.nodeProperties?this.options.nodeProperties:function(e){return e},this.options.linkProperties=this.options.linkProperties?this.options.linkProperties:function(e){return e},this.options.data=new e.ConversionDiagramDataSource({nodes:this.options.nodes,links:this.options.links},{childData:this.options.childNodes})),this.options.expanded||(this.options.expanded=new e.ExpandedKeySet),this.options.dnd.drag||(this.options.dnd.drag={nodes:{},ports:{}}),this.options.dnd.drop||(this.options.dnd.drop={background:{},nodes:{},links:{},ports:{}})},_IsDraggable:function(){var e=this.options.dnd?this.options.dnd.drag:null;return!!e&&(e.nodes&&Object.keys(e.nodes).length>0||e.ports&&Object.keys(e.ports).length>0)},_GetComponentRendererOptions:function(){return["tooltip/renderer","renderer","focusRenderer","hoverRenderer","selectionRenderer","zoomRenderer"]},_getContextHandler:function(){var t=this;return function(n,o,r,a,i,s){var l={component:e.Components.__GetWidgetConstructor(t.element),parentElement:n,rootElement:o,content:r,data:a,state:i,previousState:s,id:a.id,type:"node",label:a.label};return t._IsCustomElement()&&(l.renderDefaultHover=t.renderDefaultHover.bind(t,l),l.renderDefaultSelection=t.renderDefaultSelection.bind(t,l),l.renderDefaultFocus=t.renderDefaultFocus.bind(t,l)),t._FixRendererContext(l)}},renderDefaultHover:function(e){e.previousState&&e.state.hovered==e.previousState.hovered||this._GetDvtComponent(this.element).processDefaultHoverEffect(e.id,e.state.hovered)},renderDefaultSelection:function(e){e.previousState&&e.state.selected==e.previousState.selected||this._GetDvtComponent(this.element).processDefaultSelectionEffect(e.id,e.state.selected)},renderDefaultFocus:function(e){e.previousState&&e.state.focused==e.previousState.focused||this._GetDvtComponent(this.element).processDefaultFocusEffect(e.id,e.state.focused)},_CreateDvtComponent:function(e,t,n){return r.Diagram.newInstance(e,t,n)},_ConvertLocatorToSubId:function(e){var t=e.subId;return"oj-diagram-link"==t?t="link["+e.index+"]":"oj-diagram-node"==t?t="node["+e.index+"]":"oj-diagram-tooltip"==t&&(t="tooltip"),t},_ConvertSubIdToLocator:function(e){var t={};return 0==e.indexOf("link")?(t.subId="oj-diagram-link",t.index=this._GetFirstIndex(e)):0==e.indexOf("node")?(t.subId="oj-diagram-node",t.index=this._GetFirstIndex(e)):"tooltip"==e&&(t.subId="oj-diagram-tooltip"),t},_GetComponentStyleClasses:function(){var e=this._super();return e.push("oj-diagram"),e},_GetChildStyleClasses:function(){var e=this._super();return e["oj-dvtbase oj-diagram"]={path:"styleDefaults/animationDuration",property:"ANIM_DUR"},e["oj-diagram-node-label"]={path:"styleDefaults/nodeDefaults/labelStyle",property:"TEXT"},e["oj-diagram-node oj-selected"]={path:"styleDefaults/nodeDefaults/selectionColor",property:"border-color"},e["oj-diagram-node oj-hover"]=[{path:"styleDefaults/nodeDefaults/hoverOuterColor",property:"border-top-color"},{path:"styleDefaults/nodeDefaults/hoverInnerColor",property:"border-bottom-color"}],e["oj-diagram-link"]={path:"styleDefaults/linkDefaults/color",property:"color"},e["oj-diagram-link-label"]={path:"styleDefaults/linkDefaults/labelStyle",property:"TEXT"},e["oj-diagram-link oj-selected"]={path:"styleDefaults/linkDefaults/selectionColor",property:"border-color"},e["oj-diagram-link oj-hover"]=[{path:"styleDefaults/linkDefaults/hoverOuterColor",property:"border-top-color"},{path:"styleDefaults/linkDefaults/hoverInnerColor",property:"border-bottom-color"}],e},_GetEventTypes:function(){return["optionChange","beforeExpand","beforeCollapse","expand","collapse"]},_HandleEvent:function(e){var t=e.type;"beforeExpand"===t?this.expand(e.id,!0):"beforeCollapse"===t?this.collapse(e.id,!0):"expand"===t||"collapse"===t?this._trigger(t,null,{nodeId:e.id}):this._super(e)},_setOptions:function(e,t){e.expanded&&this._component.clearDisclosedState(),this._superApply(arguments)},_GetTranslationMap:function(){var e=this.options.translations,t=this._super();return t["DvtDiagramBundle.PROMOTED_LINK"]=e.promotedLink,t["DvtDiagramBundle.PROMOTED_LINKS"]=e.promotedLinks,t["DvtDiagramBundle.PROMOTED_LINK_ARIA_DESC"]=e.promotedLinkAriaDesc,t["DvtUtilBundle.DIAGRAM"]=e.componentName,t},_LoadResources:function(){null==this.options._resources&&(this.options._resources={});var t=this.options._resources;"rtl"===e.DomUtils.getReadingDirection()?(t.collapse_ena={src:e.Config.getResourceUrl("resources/internal-deps/dvt/diagram/container-collapse-button-ena_rtl.svg"),width:20,height:20},t.collapse_ovr={src:e.Config.getResourceUrl("resources/internal-deps/dvt/diagram/container-collapse-button-ovr_rtl.svg"),width:20,height:20},t.collapse_dwn={src:e.Config.getResourceUrl("resources/internal-deps/dvt/diagram/container-collapse-button-dwn_rtl.svg"),width:20,height:20},t.expand_ena={src:e.Config.getResourceUrl("resources/internal-deps/dvt/diagram/container-expand-button-ena_rtl.svg"),width:20,height:20},t.expand_ovr={src:e.Config.getResourceUrl("resources/internal-deps/dvt/diagram/container-expand-button-ovr_rtl.svg"),width:20,height:20},t.expand_dwn={src:e.Config.getResourceUrl("resources/internal-deps/dvt/diagram/container-expand-button-dwn_rtl.svg"),width:20,height:20}):(t.collapse_ena={src:e.Config.getResourceUrl("resources/internal-deps/dvt/diagram/container-collapse-button-ena.svg"),width:20,height:20},t.collapse_ovr={src:e.Config.getResourceUrl("resources/internal-deps/dvt/diagram/container-collapse-button-ovr.svg"),width:20,height:20},t.collapse_dwn={src:e.Config.getResourceUrl("resources/internal-deps/dvt/diagram/container-collapse-button-dwn.svg"),width:20,height:20},t.expand_ena={src:e.Config.getResourceUrl("resources/internal-deps/dvt/diagram/container-expand-button-ena.svg"),width:20,height:20},t.expand_ovr={src:e.Config.getResourceUrl("resources/internal-deps/dvt/diagram/container-expand-button-ovr.svg"),width:20,height:20},t.expand_dwn={src:e.Config.getResourceUrl("resources/internal-deps/dvt/diagram/container-expand-button-dwn.svg"),width:20,height:20})},_GetComponentNoClonePaths:function(){var e=this._super();return e.data=!0,e},collapse:function(e,t){var n=this._trigger("beforeCollapse",null,{nodeId:e});t&&!1===n||(this._NotReady(),this._component.collapse(e))},expand:function(e,t){var n=this._trigger("beforeExpand",null,{nodeId:e});t&&!1===n||(this._NotReady(),this._component.expand(e))},getNodeCount:function(){return this._component.getAutomation().getNodeCount()},getNode:function(e){return this._component.getAutomation().getNode(e)},getLinkCount:function(){return this._component.getAutomation().getLinkCount()},getLink:function(e){return this._component.getAutomation().getLink(e)},getPromotedLink:function(e,t){return this._component.getAutomation().getPromotedLink(e,t)},getContextByNode:function(e){var t=this.getSubIdByNode(e);return t&&"oj-diagram-tooltip"!==t.subId?t:null}}),e.Components.setDefaultOptions({ojDiagram:{styleDefaults:e.Components.createDynamicPropertyGetter(function(e){return e.isCustomElement?{linkDefaults:{svgStyle:{}},nodeDefaults:{icon:{svgStyle:{}}},promotedLink:{svgStyle:{}}}:{}})}}),function(){e.CustomElementBridge.registerMetadata("oj-diagram","dvtBaseComponent",{properties:{animationOnDataChange:{type:"string",enumValues:["auto","none"]},animationOnDisplay:{type:"string",enumValues:["auto","none"]},data:{},dnd:{type:"object",properties:{drag:{type:"object",properties:{nodes:{type:"object",properties:{dataTypes:{type:"Array<string>"},drag:{},dragEnd:{},dragStart:{}}},ports:{type:"object",properties:{dataTypes:{type:"Array<string>"},linkStyle:{},selector:{type:"string"},drag:{},dragEnd:{},dragStart:{}}}}},drop:{type:"object",properties:{background:{type:"object",properties:{dataTypes:{type:"Array<string>"},dragEnter:{},dragLeave:{},dragOver:{},drop:{}}},nodes:{type:"object",properties:{dataTypes:{type:"Array<string>"},dragEnter:{},dragLeave:{},dragOver:{},drop:{}}},links:{type:"object",properties:{dataTypes:{type:"Array<string>"},dragEnter:{},dragLeave:{},dragOver:{},drop:{}}},ports:{type:"object",properties:{dataTypes:{type:"Array<string>"},feedbackStyle:{},selector:{type:"string"},dragEnter:{},dragLeave:{},dragOver:{},drop:{}}}}}}},expanded:{writeback:!0},focusRenderer:{},hiddenCategories:{type:"Array<string>",writeback:!0},highlightedCategories:{type:"Array<string>",writeback:!0},highlightMatch:{type:"string",enumValues:["any","all"]},hoverBehavior:{type:"string",enumValues:["dim","none"]},hoverRenderer:{},layout:{},linkHighlightMode:{type:"string",enumValues:["linkAndNodes","link"]},linkProperties:{},maxZoom:{type:"number"},minZoom:{type:"number"},nodeHighlightMode:{type:"string",enumValues:["nodeAndIncomingLinks","nodeAndOutgoingLinks","nodeAndLinks","node"]},nodeProperties:{},panDirection:{type:"string",enumValues:["x","y","auto"]},panning:{type:"string",enumValues:["auto","none"]},promotedLinkBehavior:{type:"string",enumValues:["none","lazy","full"]},renderer:{},selection:{type:"Array<string>",writeback:!0},selectionMode:{type:"string",enumValues:["none","single","multiple"]},selectionRenderer:{},styleDefaults:{type:"object",properties:{animationDuration:{type:"number"},hoverBehaviorDelay:{type:"number"},linkDefaults:{type:"object",properties:{color:{type:"string"},endConnectorType:{type:"string",enumValues:["arrowOpen","arrow","arrowConcave","circle","rectangle","rectangleRounded","none"]},labelStyle:{type:"object"},startConnectorType:{type:"string",enumValues:["arrowOpen","arrow","arrowConcave","circle","rectangle","rectangleRounded","none"]},svgStyle:{type:"object"},width:{type:"number"}}},nodeDefaults:{type:"object",properties:{icon:{type:"object",properties:{borderColor:{type:"string"},borderWidth:{type:"number"},color:{type:"string"},height:{type:"number"},pattern:{type:"string",enumValues:["smallChecker","smallCrosshatch","smallDiagonalLeft","smallDiagonalRight","smallDiamond","smallTriangle","largeChecker","largeCrosshatch","largeDiagonalLeft","largeDiagonalRight","largeDiamond","largeTriangle","none"]},shape:{type:"string"},source:{type:"string"},sourceHover:{type:"string"},sourceHoverSelected:{type:"string"},sourceSelected:{type:"string"},svgStyle:{type:"object"},width:{type:"number"}}},labelStyle:{type:"object"},showDisclosure:{type:"string",enumValues:["on","off"]}}},promotedLink:{type:"object",properties:{color:{type:"string"},endConnectorType:{type:"string",enumValues:["arrowOpen","arrow","arrowConcave","circle","rectangle","rectangleRounded","none"]},startConnectorType:{type:"string",enumValues:["arrowOpen","arrow","arrowConcave","circle","rectangle","rectangleRounded","none"]},svgStyle:{type:"object"},width:{type:"number"}}}}},tooltip:{type:"object",properties:{renderer:{}}},touchResponse:{type:"string",enumValues:["touchStart","auto"]},translations:{type:"Object",properties:{componentName:{type:"string",value:"Diagram"},labelAndValue:{type:"string",value:"{0}: {1}"},labelClearSelection:{type:"string",value:"Clear Selection"},labelCountWithTotal:{type:"string",value:"{0} of {1}"},labelDataVisualization:{type:"string",value:"Data Visualization"},labelInvalidData:{type:"string",value:"Invalid data"},labelNoData:{type:"string",value:"No data to display"},promotedLink:{type:"string",value:"{0} link"},promotedLinkAriaDesc:{type:"string",value:"Indirect"},promotedLinks:{type:"string",value:"{0} links"},stateCollapsed:{type:"string",value:"Collapsed"},stateDrillable:{type:"string",value:"Drillable"},stateExpanded:{type:"string",value:"Expanded"},stateHidden:{type:"string",value:"Hidden"},stateIsolated:{type:"string",value:"Isolated"},stateMaximized:{type:"string",value:"Maximized"},stateMinimized:{type:"string",value:"Minimized"},stateSelected:{type:"string",value:"Selected"},stateUnselected:{type:"string",value:"Unselected"},stateVisible:{type:"string",value:"Visible"}}},zooming:{type:"string",enumValues:["auto","none"]},zoomRenderer:{}},events:{beforeCollapse:{},beforeExpand:{},collapse:{},expand:{}},methods:{getContextByNode:{},getLink:{},getLinkCount:{},getNode:{},getNodeCount:{},getPromotedLink:{}},extension:{_WIDGET_NAME:"ojDiagram"}});var t=e.CustomElementBridge.getMetadata("oj-diagram");e.CustomElementBridge.register("oj-diagram",{metadata:t,parseFunction:t.extension._DVT_PARSE_FUNC({"style-defaults.node-defaults.icon.shape":!0})})}()});