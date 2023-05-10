const footBtnDefault = [
  {
    type: "danger",
    icon: "delete",
    text: "删除",
  },
  {
    type: "info",
    icon: "cancel",
    text: "取消",
  },
  {
    type: "success",
    icon: "save",
    text: "保存",
  },
];
export const formFooterBtn = {
  marker: footBtnDefault,
  label: [
    {
      type: "warning",
      icon: "rank",
      text: "移动",
    },
    ...footBtnDefault,
  ],
  DOMOverlay: [
    {
      type: "warning",
      icon: "rank",
      text: "移动",
    },
    ...footBtnDefault,
  ],
  polyline: footBtnDefault,
  polygon: footBtnDefault,
}; //底部按钮数组

// 表单渲染字段与样式
export const formEl = {
  marker: {
    type: "marker",
    title: "marker编辑",
    formList: [
      {
        listName: "基本信息",
        formItem: [{ label: "名称", type: "input", field: "name" }],
      },
      {
        listName: "操作",
        formItem: [
          { label: "分类", type: "select", field: "sort" },
          {
            label: "marker类型",
            type: "select",
            isSelectBtn: true,
            field: "markerType",
          },
        ],
      },
      {
        listName: "样式",
        formItem: [
          { label: "选择图片", type: "upload", field: "src" },
          {
            isHalf: true,
            halfItem: [
              {
                label: "高度",
                type: "input",
                field: "width",
              },
              {
                label: "宽度",
                type: "input",
                field: "height",
              },
            ],
          },
          {
            isHalf: true,
            halfItem: [
              {
                label: "X轴",
                type: "input",
                field: "anchor_x",
              },
              {
                label: "Y轴",
                type: "input",
                field: "anchor_y",
              },
            ],
          },
        ],
      },
    ],
  },
  label: {
    type: "label",
    title: "label编辑",
    formList: [
      {
        listName: "基本信息",
        formItem: [{ label: "名称", type: "input", field: "name" }],
      },
      {
        listName: "样式",
        formItem: [
          { label: "选择颜色", type: "color", field: "color" },
          { label: "字体大小", type: "input", field: "size" },
          // {
          //   isHalf: true,
          //   halfItem: [
          //     {
          //       label: "文字边线颜色",
          //       type: "color",
          //       field: "borderColor",
          //     },
          //     {
          //       label: "文字边线宽度",
          //       type: "input",
          //       field: "borderWidth",
          //     },
          //   ],
          // },
          // {
          //   isHalf: true,
          //   halfItem: [
          //     {
          //       label: "文字边框圆角",
          //       type: "input",
          //       field: "borderRadius",
          //     },
          //     {
          //       label: "文字背景颜色",
          //       type: "color",
          //       field: "backgroundColor",
          //     },
          //   ],
          // },
        ],
      },
    ],
  },
  DOMOverlay: {
    type: "DOMOverlay",
    title: "DOMOverlay编辑",
    formList: [
      {
        listName: "基本信息",
        formItem: [{ label: "名称", type: "input", field: "name" }],
      },
      {
        listName: "样式",
        formItem: [
          { label: "选择图片", type: "upload", field: "src" },
          {
            isHalf: true,
            halfItem: [
              {
                label: "高度",
                type: "input",
                field: "width",
              },
              {
                label: "宽度",
                type: "input",
                field: "height",
              },
            ],
          },
        ],
      },
    ],
  },
  polyline: {
    type: "polyline",
    title: "polyline编辑",
    formList: [
      {
        listName: "基本信息",
        formItem: [{ label: "名称", type: "input", field: "name" }],
      },
      {
        listName: "样式",
        formItem: [
          { label: "选择线填充色", type: "color", field: "color" },
          { label: "折线宽度", type: "input", field: "width" },
          {
            isHalf: true,
            halfItem: [
              {
                label: "边线颜色",
                type: "color",
                field: "borderColor",
              },
              {
                label: "边线宽度",
                type: "input",
                field: "borderWidth",
              },
            ],
          },
          {
            isHalf: true,
            halfItem: [
              {
                label: "是否为虚线",
                type: "radio",
                field: "isDash",
                radio: [
                  {
                    value: 0,
                    label: "否",
                  },
                  {
                    value: 1,
                    label: "是",
                  },
                ],
              },
              {
                label: "虚线空白像素",
                type: "input",
                field: "dashArray",
                isDis: true,
              },
            ],
          },
          {
            isHalf: true,
            halfItem: [
              {
                label: "是否沿线路方向显示箭头",
                type: "radio",
                field: "showArrow",
                radio: [
                  {
                    value: 0,
                    label: "否",
                  },
                  {
                    value: 1,
                    label: "是",
                  },
                ],
              },
              {
                label: "箭头图标宽度",
                type: "input",
                field: "arrowW",
                isDis: true,
              },
              {
                label: "箭头图标高度",
                type: "input",
                field: "arrowH",
                isDis: true,
              },
              {
                label: "箭头之间间隙",
                type: "input",
                field: "arrowS",
                isDis: true,
              },
            ],
          },
          {
            label: "线端头方式",
            type: "select",
            field: "lineCap",
          },
          {
            label: "是否启用泛光效果",
            type: "radio",
            field: "enableBloom",
            radio: [
              {
                value: 0,
                label: "否",
              },
              {
                value: 1,
                label: "是",
              },
            ],
          },
        ],
      },
    ],
  },
  polygon: {
    type: "polygon",
    title: "polygon编辑",
    formList: [
      {
        listName: "基本信息",
        formItem: [{ label: "名称", type: "input", field: "name" }],
      },
      {
        listName: "样式",
        formItem: [
          { label: "选择面填充色", type: "color", field: "color" },
          {
            isHalf: true,
            halfItem: [
              {
                label: "是否显示边线",
                type: "radio",
                field: "showBorder",
                radio: [
                  {
                    value: 0,
                    label: "否",
                  },
                  {
                    value: 1,
                    label: "是",
                  },
                ],
              },
              // {
              //   label: "边线颜色",
              //   type: "color",
              //   field: "borderColor",
              //   isDis: true,
              // },
              // {
              //   label: "边线宽度",
              //   type: "input",
              //   field: "borderWidth",
              //   isDis: true,
              // },
            ],
          },
          // {
          //   isHalf: true,
          //   halfItem: [
          //     {
          //       label: "是否为虚线",
          //       type: "radio",
          //       field: "isDash",
          //       radio: [
          //         {
          //           value: 0,
          //           label: "否",
          //         },
          //         {
          //           value: 1,
          //           label: "是",
          //         },
          //       ],
          //     },
          //     {
          //       label: "虚线空白像素",
          //       type: "input",
          //       field: "borderDashArray",
          //       isDis: true,
          //     },
          //   ],
          // },
        ],
      },
    ],
  },
}; //DOM渲染及对应表单字段

export const markerEditEL = [
  {
    label: "联系电话",
    type: "input",
    field: "phone",
  },
  {
    label: "详细地址",
    type: "input",
    field: "address",
  },
  {
    label: "看全景",
    type: "input",
    field: "lookVR",
  },
  {
    label: "详细页路径",
    type: "input",
    field: "urlDetail",
  },
  {
    label: "缩略图",
    type: "upload",
    field: "editSrc",
  },
]; //编辑弹窗DOM渲染及对应表单字段

export const selectOpt = {
  marker: {
    sort: [
      { id: "0", value: "民宿" },
      { id: "1", value: "餐厅" },
      { id: "2", value: "厕所" },
      { id: "3", value: "停车场" },
    ],
    markerType: [
      { id: "0", value: "全景" },
      { id: "1", value: "静态" },
    ],
  },
  polyline: {
    lineCap: [
      {
        id: "butt",
        value: "butt",
      },
      {
        id: "round",
        value: "round",
      },
      {
        id: "square",
        value: "square",
      },
    ],
  },
}; //选择框数据
