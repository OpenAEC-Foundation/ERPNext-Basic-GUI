from setuptools import setup, find_packages

with open("requirements.txt") as f:
    install_requires = f.read().strip().split("\n")

with open("README.md") as f:
    long_description = f.read()

setup(
    name="erpnext_basic_gui",
    version="1.0.0",
    description="Simplified sidebar navigation for Frappe/ERPNext",
    long_description=long_description,
    long_description_content_type="text/markdown",
    author="OpenAEC Foundation",
    author_email="info@openaec.org",
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=install_requires,
    python_requires=">=3.10",
)
