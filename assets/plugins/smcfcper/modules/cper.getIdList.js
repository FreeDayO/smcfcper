smcfcper.getIdList = useProxy => {
	(!useProxy || useProxy == '')? useProxy = false: useProxy = true;

	console.info(`[smcfcper] 开始获取 idList, jsDelivr 代理: ${useProxy}`);

	(useProxy)? idListJson = "https://cdn.jsdelivr.net/gh/XeroAlpha/caidlist/output/translation/release/vanilla.json":
	idListJson = "https://raw.githubusercontent.com/XeroAlpha/caidlist/master/output/translation/release/vanilla.json";

	(typeof triedTimes === "undefined")? triedTimes = 1: null;
	$.get(idListJson, data => {
		data = $.parseJSON(data.replace(/\n|\s/g, '').replace(/,\]/g, ']').replace(/,\}/g, '}'));

		globalThis.blocks = data.block.provided,				globalThis.items = data.item.provided,
		globalThis.entities = data.entity.provided,				globalThis.effects = data.effect.provided,
		globalThis.enchants = data.enchant.provided,			globalThis.locations = data.location.provided,
		globalThis.biomes = data.biome.provided,				globalThis.familys = data.entityFamily.provided,
		globalThis.animations = data.animation.provided,		globalThis.particles = data.particleEmitter.provided,
		globalThis.sounds = data.sound.provided,				globalThis.gamerules = data.gamerule.provided,
		globalThis.slots = data.entitySlot.provided,			globalThis.loots = data.lootTable.provided,
		globalThis.damageCauses = data.damageCause.provided,	globalThis.recipes = data.recipe.provided;

		console.info("[smcfcper] 获取 idList 成功");
	}).fail = (useProxy => {
		if(triedTimes >= 2) {console.warn("[smcfcper] 获取 idList 失败"); return;}
		console.warn(`[smcfcper] 获取 idList 失败, 尝试使用 jsDelivr 代理 ${!useProxy} 重新获取`);
		triedTimes++; smcfcper.getIdList(!useProxy);
	});

}

smcfcper.getIdList();
