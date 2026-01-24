#!/bin/bash
# =============================================================================
# ERPNext Basic GUI - Installation Script
# =============================================================================
# Usage: ./install.sh <site-name>
# Example: ./install.sh mysite.localhost
# =============================================================================

set -e

SITE_NAME="${1:-}"
BENCH_PATH="${BENCH_PATH:-$(pwd)}"
APP_NAME="erpnext_basic_gui"

if [ -z "$SITE_NAME" ]; then
    echo "Usage: $0 <site-name>"
    echo "Example: $0 mysite.localhost"
    exit 1
fi

echo "=============================================="
echo "ERPNext Basic GUI - Installation"
echo "=============================================="
echo "Site: $SITE_NAME"
echo "=============================================="

# Check if we're in a bench directory
if [ ! -f "sites/common_site_config.json" ]; then
    echo "Error: Please run this script from your frappe-bench directory"
    exit 1
fi

# Get the app if not already present
if [ ! -d "apps/$APP_NAME" ]; then
    echo "Getting app from GitHub..."
    bench get-app https://github.com/OpenAEC-Foundation/ERPNext-Basic-GUI
fi

# Install on site
echo "Installing on site..."
if bench --site "$SITE_NAME" list-apps | grep -q "$APP_NAME"; then
    echo "App already installed, updating..."
else
    bench --site "$SITE_NAME" install-app "$APP_NAME"
fi

# Build assets
echo "Building assets..."
bench build --app "$APP_NAME"

# Clear cache
echo "Clearing cache..."
bench --site "$SITE_NAME" clear-cache

echo ""
echo "=============================================="
echo "Installation Complete!"
echo "=============================================="
echo ""
echo "Please restart bench: bench restart"
echo ""
echo "To customize navigation, edit:"
echo "  apps/$APP_NAME/$APP_NAME/public/js/sidebar_customizations.js"
echo ""
