export default function reformTree(treeData, opts) {
	const { department, category } = opts;
	if (!department && !category) return treeData;

	const filteredTree = { ...treeData };

	const treeCategory = {};
	const treeSize = {};

	if (department && department.length > 0) {
		department.sort().forEach((dep) => {
			treeCategory[dep] = filteredTree.Category[dep];
			treeSize[dep] = filteredTree.Sizes[dep];
		});

		filteredTree.Category = treeCategory;
	}

	if (category) {
		Object.keys(category).forEach((key) => {
			const catSize = {};

			Object.keys(category[key]).forEach((cat) => {
				catSize[cat] = filteredTree.Category[key][cat] && filteredTree.Sizes[key][cat];
			});
			treeSize[key] = catSize;
		});
	}

	filteredTree.Sizes = treeSize;

	return filteredTree;
}
