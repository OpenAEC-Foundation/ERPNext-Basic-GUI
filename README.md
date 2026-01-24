# ERPNext Basic GUI

A Frappe/ERPNext app that simplifies navigation with a clean, customizable sidebar.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Frappe](https://img.shields.io/badge/Frappe-v15+-blueviolet.svg)
![ERPNext](https://img.shields.io/badge/ERPNext-v15+-green.svg)

## Features

✅ **Workspace Redirects** - Sidebar buttons go directly to doctype lists  
✅ **Custom Navigation Sidebar** - Always visible on List and Form views  
✅ **Clean Interface** - Hides default filter sidebar (Tags, Assigned To, Labels)  
✅ **Fully Configurable** - Easy to customize navigation links  
✅ **Responsive** - Works on desktop, hides on mobile for better UX  

## Screenshot

```
┌─────────────────────────────────────────────────────────────┐
│  Navigation          │  Customer List                      │
│  ─────────────────   │  ─────────────────────────────────  │
│  🏠 Home             │  [+ Add Customer]                   │
│  📋 Quotations       │                                     │
│  📊 Projects         │  Name          │ Status │ Created   │
│  👥 Customers    ◄── │  ────────────────────────────────   │
│  🏭 Suppliers        │  Acme Corp     │ Active │ 2024-01   │
│  📄 Purchase Inv.    │  Beta Inc      │ Active │ 2024-01   │
│  💰 Sales Invoices   │  Gamma LLC     │ Lead   │ 2024-01   │
│  ⏱️ Timesheets       │                                     │
│  👤 Employees        │                                     │
│  ⚙️ Users            │                                     │
│  ─────────────────   │                                     │
│  🏦 Bank Trans.      │                                     │
│  📒 GL Entry         │                                     │
└─────────────────────────────────────────────────────────────┘
```

## Installation

### Quick Install

```bash
cd /path/to/frappe-bench
bench get-app https://github.com/OpenAEC-Foundation/ERPNext-Basic-GUI
bench --site your-site.localhost install-app erpnext_basic_gui
bench build --app erpnext_basic_gui
bench restart
```

### Using Install Script

```bash
cd /path/to/frappe-bench
curl -O https://raw.githubusercontent.com/OpenAEC-Foundation/ERPNext-Basic-GUI/main/install.sh
chmod +x install.sh
./install.sh your-site.localhost
bench restart
```

## Configuration

Edit `erpnext_basic_gui/public/js/sidebar_customizations.js` to customize navigation:

```javascript
const WORKSPACE_LINKS = [
    { label: "Home", icon: "home", route: "/app/home" },
    { label: "Projects", icon: "gantt", route: "/app/project", workspace: "Projects" },
    { label: "Customers", icon: "share-people", route: "/app/customer", workspace: "Customers" },
    { divider: true },  // Visual separator
    { label: "Settings", icon: "setting", route: "/app/user" }
];
```

### Configuration Options

| Property | Description |
|----------|-------------|
| `label` | Display text in sidebar |
| `icon` | Frappe icon name |
| `route` | URL path to navigate to |
| `workspace` | Workspace name to redirect (optional) |
| `divider` | Set `true` for visual separator |

### Available Icons

`home`, `list`, `gantt`, `share-people`, `stock`, `file`, `income`, `calendar`, `hr`, `setting`, `accounting`, `check`, `edit`, `delete`, `search`, `filter`, `refresh`, and more.

## After Customization

```bash
bench build --app erpnext_basic_gui
bench --site your-site.localhost clear-cache
```

## Uninstall

```bash
bench --site your-site.localhost uninstall-app erpnext_basic_gui
bench remove-app erpnext_basic_gui
```

## Requirements

- Frappe Framework v15+
- ERPNext v15+ (optional, works with Frappe alone)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- 🐛 [Report Issues](https://github.com/OpenAEC-Foundation/ERPNext-Basic-GUI/issues)
- 💡 [Request Features](https://github.com/OpenAEC-Foundation/ERPNext-Basic-GUI/issues)

---

Made with ❤️ by [OpenAEC Foundation](https://github.com/OpenAEC-Foundation)
