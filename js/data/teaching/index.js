// 心理病理學觀點教學：每幕的重點、每個選項的病理學觀點與諮商觀點。
// 選項依原始撰寫順序（0–4）對應；畫面上的選項順序另行打亂，不影響對應。
// 「」內的準則文字一律逐字取自 dsm-5-tr-zh.txt。
import shen_mo from './shen_mo.js?v=62';
import lin_jianwei from './lin_jianwei.js?v=62';
import ruri from './ruri.js?v=62';
import han_xiao from './han_xiao.js?v=62';
import su_fei from './su_fei.js?v=62';
import xia_le from './xia_le.js?v=62';
import gu_qingcheng from './gu_qingcheng.js?v=62';
import wen_yan from './wen_yan.js?v=62';
import bai_xiaolu from './bai_xiaolu.js?v=62';
import ji_yan from './ji_yan.js?v=62';
import lu_qinglan from './lu_qinglan.js?v=62';
import you_ziqian from './you_ziqian.js?v=62';

export const PATHOLOGY_TEACHING = {shen_mo,lin_jianwei,ruri,han_xiao,su_fei,xia_le,gu_qingcheng,wen_yan,bai_xiaolu,ji_yan,lu_qinglan,you_ziqian};

export function getSceneTeaching(id, number, {daily = false} = {}) {
  const t = PATHOLOGY_TEACHING[id];
  const block = daily ? t?.daily?.[number] : t?.[number];
  return block ? {focus: block.focus, counsel: block.counsel || ''} : null;
}

export function getOptionTeaching(id, number, index, {daily = false} = {}) {
  const t = PATHOLOGY_TEACHING[id];
  const block = daily ? t?.daily?.[number] : t?.[number];
  return block?.options?.[index] || null;
}
