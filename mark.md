

1、理解这个项目需求，研读需求文档，研读项目代码
2、列出项目的需求任务，需求的注意事项
3、启动项目，观察项目的前端表现，showcase 组件会操作数据流到multiCheckbox组件中，
根据shaowcase的操作可以控制multicheck的表现形式，包括组件名称label，展示多少列columns，checkbox的选项options，
需要展示多个值values，指定了点击checkbox的事件，最后将选中的checkbox的option，显示Callback options下。
4、从项目代码的子组件multicheck代码中， 需要去实现该组件，然后完成该组件的unit test.
5、在此期间，要完成项目目前存在的一个问题，就是页面的无限刷新问题。
6、在分析完任务之后，接着需要对其任务进行分解。
7、根据单一功能原则来判定组件的范围，进行任务分解：
                1、分析multicheck的label的意义，然后定义一个label组件去承接label的意义完成展示multicheck的名称。
                2、将展示的最外层的form 表单和checkbox列表作为一个组件，包含一个item列表组件和列表项组件，总共三个组件
                3、分析列表的展示规则：
                            分析multicheck的组件可以动态根据colums，values,和展示的options，而且在展示多列展示的时候，
                            options的展示有一定的规则至上往下规则（需要计算，每列的数量（/ 得到列数，%得到每行需要加的元素量）
                4、分析 selectAll的勾选规则
8、展示先完成列表的展示，然后在慢慢完善其他的需求要求。

难点：
1、列表展示问题
2、selectAll和options联动展示
3、页面的无限刷新问题
4、单元测试，遇到css解析不了问题（配置jest）

                    