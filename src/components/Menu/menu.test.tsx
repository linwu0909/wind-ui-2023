import React from 'react'
import { fireEvent, render, RenderResult, cleanup, waitFor } from '@testing-library/react'

import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}

const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem>xxx</MenuItem>
            <SubMenu title="dropdown">
                <MenuItem>
                    dropdown1
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}

const createStyle = () => {
    const cssStyle: string = `
        .lw-submenu {
            display: none;
        }
        .lw-submenu .menu-opened {
            display: block;
        }
    `
    const style = document.createElement('style')
    // style.type = 'text/css'
    style.innerHTML = cssStyle
    return style
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement

describe('test Menu and MenuItem component', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        wrapper.container.append(createStyle())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('lw-menu test')
        // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })
    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('xxx')
        // 测试自动点击后是否符合条件
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
        // 每个case执行完毕都会自动调用cleanup()
    })
    it('should render vertical mode when mode is set to vertical', () => {
        cleanup()
        const wrapper = render(generateMenu(testVerProps))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
    it('it should dropdown items when hover on subMenu', async () => {
        expect(wrapper.queryByText('dropdown1')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('dropdown')

        // todo 鼠标进入 显示 通过控制display:block=>有menu-opened
        fireEvent.mouseEnter(dropdownElement)
        // await waitFor(() => {
        //     expect(wrapper.getByText('dropdown1')).toBeVisible()
        // })

        fireEvent.click(wrapper.getByText('dropdown1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')

        // 鼠标离开 隐藏 通过控制display:none=>没menu-opened
        fireEvent.mouseLeave(dropdownElement)
        // await waitFor(() => {
        //     expect(wrapper.getByText('dropdown1')).not.toBeVisible()
        // })
        // await expect(wrapper.queryByText('dropdown1')).not.toBeVisible()
    })
})