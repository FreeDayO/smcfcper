export const getIdList = (useProxy = smcfcper.settings.useProxy) => {
	smcfcper.log(`开始获取 idList, jsDelivr 代理: ${useProxy}`);

	let idListJson = (useProxy)? "https://fastly.jsdelivr.net/gh/XeroAlpha/caidlist/output/translation/release/vanilla.json":
	"https://raw.githubusercontent.com/XeroAlpha/caidlist/master/output/translation/release/vanilla.json", triedTimes = 0;

	(triedTimes === 0)? triedTimes = 1: null;
	$.get(idListJson, json => {
		json = $.parseJSON(json.replace(/\n|\s/g, '').replace(/,\]/g, ']').replace(/,\}/g, '}'));

		globalThis.blocks = json.block.provided,				globalThis.items = json.item.provided,
		globalThis.entities = json.entity.provided,				globalThis.effects = json.effect.provided,
		globalThis.enchants = json.enchant.provided,			globalThis.locations = json.location.provided,
		globalThis.biomes = json.biome.provided,				globalThis.familys = json.entityFamily.provided,
		globalThis.animations = json.animation.provided,		globalThis.particles = json.particleEmitter.provided,
		globalThis.sounds = json.sound.provided,				globalThis.gamerules = json.gamerule.provided,
		globalThis.slots = json.entitySlot.provided,			globalThis.loots = json.lootTable.provided,
		globalThis.damageCauses = json.damageCause.provided,	globalThis.recipes = json.recipe.provided;

		
	}).then(smcfcper.log("获取 idList 成功")).catch(e => smcfcper.log(`获取 idList 失败, 原因:\n\n${e}\n`));

}
