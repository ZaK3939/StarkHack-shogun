import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useFetchData } from '@/hooks/fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ContractAddress: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  bool: { input: any; output: any; }
  felt252: { input: any; output: any; }
  u8: { input: any; output: any; }
  u32: { input: any; output: any; }
  u64: { input: any; output: any; }
};

export type BackpackGrids = {
  __typename?: 'BackpackGrids';
  enabled?: Maybe<Scalars['bool']['output']>;
  entity?: Maybe<World__Entity>;
  occupied?: Maybe<Scalars['bool']['output']>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
  x?: Maybe<Scalars['u32']['output']>;
  y?: Maybe<Scalars['u32']['output']>;
};

export type BackpackGridsConnection = {
  __typename?: 'BackpackGridsConnection';
  edges?: Maybe<Array<Maybe<BackpackGridsEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type BackpackGridsEdge = {
  __typename?: 'BackpackGridsEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<BackpackGrids>;
};

export type BackpackGridsOrder = {
  direction: OrderDirection;
  field: BackpackGridsOrderField;
};

export enum BackpackGridsOrderField {
  Enabled = 'ENABLED',
  Occupied = 'OCCUPIED',
  Player = 'PLAYER',
  X = 'X',
  Y = 'Y'
}

export type BackpackGridsWhereInput = {
  enabled?: InputMaybe<Scalars['bool']['input']>;
  occupied?: InputMaybe<Scalars['bool']['input']>;
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  x?: InputMaybe<Scalars['u32']['input']>;
  xEQ?: InputMaybe<Scalars['u32']['input']>;
  xGT?: InputMaybe<Scalars['u32']['input']>;
  xGTE?: InputMaybe<Scalars['u32']['input']>;
  xIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  xLIKE?: InputMaybe<Scalars['u32']['input']>;
  xLT?: InputMaybe<Scalars['u32']['input']>;
  xLTE?: InputMaybe<Scalars['u32']['input']>;
  xNEQ?: InputMaybe<Scalars['u32']['input']>;
  xNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  xNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  y?: InputMaybe<Scalars['u32']['input']>;
  yEQ?: InputMaybe<Scalars['u32']['input']>;
  yGT?: InputMaybe<Scalars['u32']['input']>;
  yGTE?: InputMaybe<Scalars['u32']['input']>;
  yIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  yLIKE?: InputMaybe<Scalars['u32']['input']>;
  yLT?: InputMaybe<Scalars['u32']['input']>;
  yLTE?: InputMaybe<Scalars['u32']['input']>;
  yNEQ?: InputMaybe<Scalars['u32']['input']>;
  yNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  yNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
};

export type BattleLog = {
  __typename?: 'BattleLog';
  dummyCharId?: Maybe<Scalars['u32']['output']>;
  dummyCharLevel?: Maybe<Scalars['u32']['output']>;
  entity?: Maybe<World__Entity>;
  id?: Maybe<Scalars['u32']['output']>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
  winner?: Maybe<Scalars['felt252']['output']>;
};

export type BattleLogConnection = {
  __typename?: 'BattleLogConnection';
  edges?: Maybe<Array<Maybe<BattleLogEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type BattleLogCounter = {
  __typename?: 'BattleLogCounter';
  count?: Maybe<Scalars['u32']['output']>;
  entity?: Maybe<World__Entity>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
};

export type BattleLogCounterConnection = {
  __typename?: 'BattleLogCounterConnection';
  edges?: Maybe<Array<Maybe<BattleLogCounterEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type BattleLogCounterEdge = {
  __typename?: 'BattleLogCounterEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<BattleLogCounter>;
};

export type BattleLogCounterOrder = {
  direction: OrderDirection;
  field: BattleLogCounterOrderField;
};

export enum BattleLogCounterOrderField {
  Count = 'COUNT',
  Player = 'PLAYER'
}

export type BattleLogCounterWhereInput = {
  count?: InputMaybe<Scalars['u32']['input']>;
  countEQ?: InputMaybe<Scalars['u32']['input']>;
  countGT?: InputMaybe<Scalars['u32']['input']>;
  countGTE?: InputMaybe<Scalars['u32']['input']>;
  countIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  countLIKE?: InputMaybe<Scalars['u32']['input']>;
  countLT?: InputMaybe<Scalars['u32']['input']>;
  countLTE?: InputMaybe<Scalars['u32']['input']>;
  countNEQ?: InputMaybe<Scalars['u32']['input']>;
  countNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  countNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type BattleLogDetail = {
  __typename?: 'BattleLogDetail';
  battleLogId?: Maybe<Scalars['u32']['output']>;
  buffType?: Maybe<Scalars['felt252']['output']>;
  damageCaused?: Maybe<Scalars['u32']['output']>;
  dummy_armor_stacks?: Maybe<Scalars['u32']['output']>;
  dummy_reflect_stacks?: Maybe<Scalars['u32']['output']>;
  dummy_regen_stacks?: Maybe<Scalars['u32']['output']>;
  dummy_spike_stacks?: Maybe<Scalars['u32']['output']>;
  entity?: Maybe<World__Entity>;
  id?: Maybe<Scalars['u32']['output']>;
  isDodged?: Maybe<Scalars['bool']['output']>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
  player_armor_stacks?: Maybe<Scalars['u32']['output']>;
  player_reflect_stacks?: Maybe<Scalars['u32']['output']>;
  player_regen_stacks?: Maybe<Scalars['u32']['output']>;
  player_spike_stacks?: Maybe<Scalars['u32']['output']>;
  regenHP?: Maybe<Scalars['u32']['output']>;
  whichItem?: Maybe<Scalars['u32']['output']>;
  whoTriggered?: Maybe<Scalars['felt252']['output']>;
};

export type BattleLogDetailConnection = {
  __typename?: 'BattleLogDetailConnection';
  edges?: Maybe<Array<Maybe<BattleLogDetailEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type BattleLogDetailEdge = {
  __typename?: 'BattleLogDetailEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<BattleLogDetail>;
};

export type BattleLogDetailOrder = {
  direction: OrderDirection;
  field: BattleLogDetailOrderField;
};

export enum BattleLogDetailOrderField {
  Battlelogid = 'BATTLELOGID',
  Bufftype = 'BUFFTYPE',
  Damagecaused = 'DAMAGECAUSED',
  DummyArmorStacks = 'DUMMY_ARMOR_STACKS',
  DummyReflectStacks = 'DUMMY_REFLECT_STACKS',
  DummyRegenStacks = 'DUMMY_REGEN_STACKS',
  DummySpikeStacks = 'DUMMY_SPIKE_STACKS',
  Id = 'ID',
  Isdodged = 'ISDODGED',
  Player = 'PLAYER',
  PlayerArmorStacks = 'PLAYER_ARMOR_STACKS',
  PlayerReflectStacks = 'PLAYER_REFLECT_STACKS',
  PlayerRegenStacks = 'PLAYER_REGEN_STACKS',
  PlayerSpikeStacks = 'PLAYER_SPIKE_STACKS',
  Regenhp = 'REGENHP',
  Whichitem = 'WHICHITEM',
  Whotriggered = 'WHOTRIGGERED'
}

export type BattleLogDetailWhereInput = {
  battleLogId?: InputMaybe<Scalars['u32']['input']>;
  battleLogIdEQ?: InputMaybe<Scalars['u32']['input']>;
  battleLogIdGT?: InputMaybe<Scalars['u32']['input']>;
  battleLogIdGTE?: InputMaybe<Scalars['u32']['input']>;
  battleLogIdIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  battleLogIdLIKE?: InputMaybe<Scalars['u32']['input']>;
  battleLogIdLT?: InputMaybe<Scalars['u32']['input']>;
  battleLogIdLTE?: InputMaybe<Scalars['u32']['input']>;
  battleLogIdNEQ?: InputMaybe<Scalars['u32']['input']>;
  battleLogIdNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  battleLogIdNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  buffType?: InputMaybe<Scalars['felt252']['input']>;
  buffTypeEQ?: InputMaybe<Scalars['felt252']['input']>;
  buffTypeGT?: InputMaybe<Scalars['felt252']['input']>;
  buffTypeGTE?: InputMaybe<Scalars['felt252']['input']>;
  buffTypeIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  buffTypeLIKE?: InputMaybe<Scalars['felt252']['input']>;
  buffTypeLT?: InputMaybe<Scalars['felt252']['input']>;
  buffTypeLTE?: InputMaybe<Scalars['felt252']['input']>;
  buffTypeNEQ?: InputMaybe<Scalars['felt252']['input']>;
  buffTypeNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  buffTypeNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  damageCaused?: InputMaybe<Scalars['u32']['input']>;
  damageCausedEQ?: InputMaybe<Scalars['u32']['input']>;
  damageCausedGT?: InputMaybe<Scalars['u32']['input']>;
  damageCausedGTE?: InputMaybe<Scalars['u32']['input']>;
  damageCausedIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  damageCausedLIKE?: InputMaybe<Scalars['u32']['input']>;
  damageCausedLT?: InputMaybe<Scalars['u32']['input']>;
  damageCausedLTE?: InputMaybe<Scalars['u32']['input']>;
  damageCausedNEQ?: InputMaybe<Scalars['u32']['input']>;
  damageCausedNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  damageCausedNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  dummy_armor_stacks?: InputMaybe<Scalars['u32']['input']>;
  dummy_armor_stacksEQ?: InputMaybe<Scalars['u32']['input']>;
  dummy_armor_stacksGT?: InputMaybe<Scalars['u32']['input']>;
  dummy_armor_stacksGTE?: InputMaybe<Scalars['u32']['input']>;
  dummy_armor_stacksIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  dummy_armor_stacksLIKE?: InputMaybe<Scalars['u32']['input']>;
  dummy_armor_stacksLT?: InputMaybe<Scalars['u32']['input']>;
  dummy_armor_stacksLTE?: InputMaybe<Scalars['u32']['input']>;
  dummy_armor_stacksNEQ?: InputMaybe<Scalars['u32']['input']>;
  dummy_armor_stacksNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  dummy_armor_stacksNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  dummy_reflect_stacks?: InputMaybe<Scalars['u32']['input']>;
  dummy_reflect_stacksEQ?: InputMaybe<Scalars['u32']['input']>;
  dummy_reflect_stacksGT?: InputMaybe<Scalars['u32']['input']>;
  dummy_reflect_stacksGTE?: InputMaybe<Scalars['u32']['input']>;
  dummy_reflect_stacksIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  dummy_reflect_stacksLIKE?: InputMaybe<Scalars['u32']['input']>;
  dummy_reflect_stacksLT?: InputMaybe<Scalars['u32']['input']>;
  dummy_reflect_stacksLTE?: InputMaybe<Scalars['u32']['input']>;
  dummy_reflect_stacksNEQ?: InputMaybe<Scalars['u32']['input']>;
  dummy_reflect_stacksNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  dummy_reflect_stacksNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  dummy_regen_stacks?: InputMaybe<Scalars['u32']['input']>;
  dummy_regen_stacksEQ?: InputMaybe<Scalars['u32']['input']>;
  dummy_regen_stacksGT?: InputMaybe<Scalars['u32']['input']>;
  dummy_regen_stacksGTE?: InputMaybe<Scalars['u32']['input']>;
  dummy_regen_stacksIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  dummy_regen_stacksLIKE?: InputMaybe<Scalars['u32']['input']>;
  dummy_regen_stacksLT?: InputMaybe<Scalars['u32']['input']>;
  dummy_regen_stacksLTE?: InputMaybe<Scalars['u32']['input']>;
  dummy_regen_stacksNEQ?: InputMaybe<Scalars['u32']['input']>;
  dummy_regen_stacksNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  dummy_regen_stacksNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  dummy_spike_stacks?: InputMaybe<Scalars['u32']['input']>;
  dummy_spike_stacksEQ?: InputMaybe<Scalars['u32']['input']>;
  dummy_spike_stacksGT?: InputMaybe<Scalars['u32']['input']>;
  dummy_spike_stacksGTE?: InputMaybe<Scalars['u32']['input']>;
  dummy_spike_stacksIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  dummy_spike_stacksLIKE?: InputMaybe<Scalars['u32']['input']>;
  dummy_spike_stacksLT?: InputMaybe<Scalars['u32']['input']>;
  dummy_spike_stacksLTE?: InputMaybe<Scalars['u32']['input']>;
  dummy_spike_stacksNEQ?: InputMaybe<Scalars['u32']['input']>;
  dummy_spike_stacksNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  dummy_spike_stacksNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  id?: InputMaybe<Scalars['u32']['input']>;
  idEQ?: InputMaybe<Scalars['u32']['input']>;
  idGT?: InputMaybe<Scalars['u32']['input']>;
  idGTE?: InputMaybe<Scalars['u32']['input']>;
  idIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  idLIKE?: InputMaybe<Scalars['u32']['input']>;
  idLT?: InputMaybe<Scalars['u32']['input']>;
  idLTE?: InputMaybe<Scalars['u32']['input']>;
  idNEQ?: InputMaybe<Scalars['u32']['input']>;
  idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  idNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  isDodged?: InputMaybe<Scalars['bool']['input']>;
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_armor_stacks?: InputMaybe<Scalars['u32']['input']>;
  player_armor_stacksEQ?: InputMaybe<Scalars['u32']['input']>;
  player_armor_stacksGT?: InputMaybe<Scalars['u32']['input']>;
  player_armor_stacksGTE?: InputMaybe<Scalars['u32']['input']>;
  player_armor_stacksIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  player_armor_stacksLIKE?: InputMaybe<Scalars['u32']['input']>;
  player_armor_stacksLT?: InputMaybe<Scalars['u32']['input']>;
  player_armor_stacksLTE?: InputMaybe<Scalars['u32']['input']>;
  player_armor_stacksNEQ?: InputMaybe<Scalars['u32']['input']>;
  player_armor_stacksNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  player_armor_stacksNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  player_reflect_stacks?: InputMaybe<Scalars['u32']['input']>;
  player_reflect_stacksEQ?: InputMaybe<Scalars['u32']['input']>;
  player_reflect_stacksGT?: InputMaybe<Scalars['u32']['input']>;
  player_reflect_stacksGTE?: InputMaybe<Scalars['u32']['input']>;
  player_reflect_stacksIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  player_reflect_stacksLIKE?: InputMaybe<Scalars['u32']['input']>;
  player_reflect_stacksLT?: InputMaybe<Scalars['u32']['input']>;
  player_reflect_stacksLTE?: InputMaybe<Scalars['u32']['input']>;
  player_reflect_stacksNEQ?: InputMaybe<Scalars['u32']['input']>;
  player_reflect_stacksNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  player_reflect_stacksNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  player_regen_stacks?: InputMaybe<Scalars['u32']['input']>;
  player_regen_stacksEQ?: InputMaybe<Scalars['u32']['input']>;
  player_regen_stacksGT?: InputMaybe<Scalars['u32']['input']>;
  player_regen_stacksGTE?: InputMaybe<Scalars['u32']['input']>;
  player_regen_stacksIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  player_regen_stacksLIKE?: InputMaybe<Scalars['u32']['input']>;
  player_regen_stacksLT?: InputMaybe<Scalars['u32']['input']>;
  player_regen_stacksLTE?: InputMaybe<Scalars['u32']['input']>;
  player_regen_stacksNEQ?: InputMaybe<Scalars['u32']['input']>;
  player_regen_stacksNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  player_regen_stacksNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  player_spike_stacks?: InputMaybe<Scalars['u32']['input']>;
  player_spike_stacksEQ?: InputMaybe<Scalars['u32']['input']>;
  player_spike_stacksGT?: InputMaybe<Scalars['u32']['input']>;
  player_spike_stacksGTE?: InputMaybe<Scalars['u32']['input']>;
  player_spike_stacksIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  player_spike_stacksLIKE?: InputMaybe<Scalars['u32']['input']>;
  player_spike_stacksLT?: InputMaybe<Scalars['u32']['input']>;
  player_spike_stacksLTE?: InputMaybe<Scalars['u32']['input']>;
  player_spike_stacksNEQ?: InputMaybe<Scalars['u32']['input']>;
  player_spike_stacksNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  player_spike_stacksNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  regenHP?: InputMaybe<Scalars['u32']['input']>;
  regenHPEQ?: InputMaybe<Scalars['u32']['input']>;
  regenHPGT?: InputMaybe<Scalars['u32']['input']>;
  regenHPGTE?: InputMaybe<Scalars['u32']['input']>;
  regenHPIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  regenHPLIKE?: InputMaybe<Scalars['u32']['input']>;
  regenHPLT?: InputMaybe<Scalars['u32']['input']>;
  regenHPLTE?: InputMaybe<Scalars['u32']['input']>;
  regenHPNEQ?: InputMaybe<Scalars['u32']['input']>;
  regenHPNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  regenHPNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  whichItem?: InputMaybe<Scalars['u32']['input']>;
  whichItemEQ?: InputMaybe<Scalars['u32']['input']>;
  whichItemGT?: InputMaybe<Scalars['u32']['input']>;
  whichItemGTE?: InputMaybe<Scalars['u32']['input']>;
  whichItemIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  whichItemLIKE?: InputMaybe<Scalars['u32']['input']>;
  whichItemLT?: InputMaybe<Scalars['u32']['input']>;
  whichItemLTE?: InputMaybe<Scalars['u32']['input']>;
  whichItemNEQ?: InputMaybe<Scalars['u32']['input']>;
  whichItemNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  whichItemNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  whoTriggered?: InputMaybe<Scalars['felt252']['input']>;
  whoTriggeredEQ?: InputMaybe<Scalars['felt252']['input']>;
  whoTriggeredGT?: InputMaybe<Scalars['felt252']['input']>;
  whoTriggeredGTE?: InputMaybe<Scalars['felt252']['input']>;
  whoTriggeredIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  whoTriggeredLIKE?: InputMaybe<Scalars['felt252']['input']>;
  whoTriggeredLT?: InputMaybe<Scalars['felt252']['input']>;
  whoTriggeredLTE?: InputMaybe<Scalars['felt252']['input']>;
  whoTriggeredNEQ?: InputMaybe<Scalars['felt252']['input']>;
  whoTriggeredNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  whoTriggeredNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
};

export type BattleLogEdge = {
  __typename?: 'BattleLogEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<BattleLog>;
};

export type BattleLogOrder = {
  direction: OrderDirection;
  field: BattleLogOrderField;
};

export enum BattleLogOrderField {
  Dummycharid = 'DUMMYCHARID',
  Dummycharlevel = 'DUMMYCHARLEVEL',
  Id = 'ID',
  Player = 'PLAYER',
  Winner = 'WINNER'
}

export type BattleLogWhereInput = {
  dummyCharId?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdEQ?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdGT?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdGTE?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  dummyCharIdLIKE?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdLT?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdLTE?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdNEQ?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  dummyCharIdNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  dummyCharLevel?: InputMaybe<Scalars['u32']['input']>;
  dummyCharLevelEQ?: InputMaybe<Scalars['u32']['input']>;
  dummyCharLevelGT?: InputMaybe<Scalars['u32']['input']>;
  dummyCharLevelGTE?: InputMaybe<Scalars['u32']['input']>;
  dummyCharLevelIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  dummyCharLevelLIKE?: InputMaybe<Scalars['u32']['input']>;
  dummyCharLevelLT?: InputMaybe<Scalars['u32']['input']>;
  dummyCharLevelLTE?: InputMaybe<Scalars['u32']['input']>;
  dummyCharLevelNEQ?: InputMaybe<Scalars['u32']['input']>;
  dummyCharLevelNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  dummyCharLevelNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  id?: InputMaybe<Scalars['u32']['input']>;
  idEQ?: InputMaybe<Scalars['u32']['input']>;
  idGT?: InputMaybe<Scalars['u32']['input']>;
  idGTE?: InputMaybe<Scalars['u32']['input']>;
  idIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  idLIKE?: InputMaybe<Scalars['u32']['input']>;
  idLT?: InputMaybe<Scalars['u32']['input']>;
  idLTE?: InputMaybe<Scalars['u32']['input']>;
  idNEQ?: InputMaybe<Scalars['u32']['input']>;
  idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  idNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  winner?: InputMaybe<Scalars['felt252']['input']>;
  winnerEQ?: InputMaybe<Scalars['felt252']['input']>;
  winnerGT?: InputMaybe<Scalars['felt252']['input']>;
  winnerGTE?: InputMaybe<Scalars['felt252']['input']>;
  winnerIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  winnerLIKE?: InputMaybe<Scalars['felt252']['input']>;
  winnerLT?: InputMaybe<Scalars['felt252']['input']>;
  winnerLTE?: InputMaybe<Scalars['felt252']['input']>;
  winnerNEQ?: InputMaybe<Scalars['felt252']['input']>;
  winnerNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  winnerNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
};

export type Character = {
  __typename?: 'Character';
  birthCount?: Maybe<Scalars['u32']['output']>;
  dummied?: Maybe<Scalars['bool']['output']>;
  entity?: Maybe<World__Entity>;
  gold?: Maybe<Scalars['u32']['output']>;
  health?: Maybe<Scalars['u32']['output']>;
  loss?: Maybe<Scalars['u32']['output']>;
  name?: Maybe<Scalars['felt252']['output']>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
  rating?: Maybe<Scalars['u32']['output']>;
  totalLoss?: Maybe<Scalars['u32']['output']>;
  totalWins?: Maybe<Scalars['u32']['output']>;
  updatedAt?: Maybe<Scalars['u64']['output']>;
  winStreak?: Maybe<Scalars['u32']['output']>;
  wins?: Maybe<Scalars['u32']['output']>;
};

export type CharacterConnection = {
  __typename?: 'CharacterConnection';
  edges?: Maybe<Array<Maybe<CharacterEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CharacterEdge = {
  __typename?: 'CharacterEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Character>;
};

export type CharacterItemInventory = {
  __typename?: 'CharacterItemInventory';
  entity?: Maybe<World__Entity>;
  id?: Maybe<Scalars['u32']['output']>;
  itemId?: Maybe<Scalars['u32']['output']>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
  position?: Maybe<CharacterItemInventory_Position>;
  rotation?: Maybe<Scalars['u32']['output']>;
};

export type CharacterItemInventoryConnection = {
  __typename?: 'CharacterItemInventoryConnection';
  edges?: Maybe<Array<Maybe<CharacterItemInventoryEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CharacterItemInventoryEdge = {
  __typename?: 'CharacterItemInventoryEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<CharacterItemInventory>;
};

export type CharacterItemInventoryOrder = {
  direction: OrderDirection;
  field: CharacterItemInventoryOrderField;
};

export enum CharacterItemInventoryOrderField {
  Id = 'ID',
  Itemid = 'ITEMID',
  Player = 'PLAYER',
  Position = 'POSITION',
  Rotation = 'ROTATION'
}

export type CharacterItemInventoryWhereInput = {
  id?: InputMaybe<Scalars['u32']['input']>;
  idEQ?: InputMaybe<Scalars['u32']['input']>;
  idGT?: InputMaybe<Scalars['u32']['input']>;
  idGTE?: InputMaybe<Scalars['u32']['input']>;
  idIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  idLIKE?: InputMaybe<Scalars['u32']['input']>;
  idLT?: InputMaybe<Scalars['u32']['input']>;
  idLTE?: InputMaybe<Scalars['u32']['input']>;
  idNEQ?: InputMaybe<Scalars['u32']['input']>;
  idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  idNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  itemId?: InputMaybe<Scalars['u32']['input']>;
  itemIdEQ?: InputMaybe<Scalars['u32']['input']>;
  itemIdGT?: InputMaybe<Scalars['u32']['input']>;
  itemIdGTE?: InputMaybe<Scalars['u32']['input']>;
  itemIdIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  itemIdLIKE?: InputMaybe<Scalars['u32']['input']>;
  itemIdLT?: InputMaybe<Scalars['u32']['input']>;
  itemIdLTE?: InputMaybe<Scalars['u32']['input']>;
  itemIdNEQ?: InputMaybe<Scalars['u32']['input']>;
  itemIdNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  itemIdNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  rotation?: InputMaybe<Scalars['u32']['input']>;
  rotationEQ?: InputMaybe<Scalars['u32']['input']>;
  rotationGT?: InputMaybe<Scalars['u32']['input']>;
  rotationGTE?: InputMaybe<Scalars['u32']['input']>;
  rotationIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  rotationLIKE?: InputMaybe<Scalars['u32']['input']>;
  rotationLT?: InputMaybe<Scalars['u32']['input']>;
  rotationLTE?: InputMaybe<Scalars['u32']['input']>;
  rotationNEQ?: InputMaybe<Scalars['u32']['input']>;
  rotationNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  rotationNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
};

export type CharacterItemInventory_Position = {
  __typename?: 'CharacterItemInventory_Position';
  x?: Maybe<Scalars['u32']['output']>;
  y?: Maybe<Scalars['u32']['output']>;
};

export type CharacterItemStorage = {
  __typename?: 'CharacterItemStorage';
  entity?: Maybe<World__Entity>;
  id?: Maybe<Scalars['u32']['output']>;
  itemId?: Maybe<Scalars['u32']['output']>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
};

export type CharacterItemStorageConnection = {
  __typename?: 'CharacterItemStorageConnection';
  edges?: Maybe<Array<Maybe<CharacterItemStorageEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CharacterItemStorageEdge = {
  __typename?: 'CharacterItemStorageEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<CharacterItemStorage>;
};

export type CharacterItemStorageOrder = {
  direction: OrderDirection;
  field: CharacterItemStorageOrderField;
};

export enum CharacterItemStorageOrderField {
  Id = 'ID',
  Itemid = 'ITEMID',
  Player = 'PLAYER'
}

export type CharacterItemStorageWhereInput = {
  id?: InputMaybe<Scalars['u32']['input']>;
  idEQ?: InputMaybe<Scalars['u32']['input']>;
  idGT?: InputMaybe<Scalars['u32']['input']>;
  idGTE?: InputMaybe<Scalars['u32']['input']>;
  idIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  idLIKE?: InputMaybe<Scalars['u32']['input']>;
  idLT?: InputMaybe<Scalars['u32']['input']>;
  idLTE?: InputMaybe<Scalars['u32']['input']>;
  idNEQ?: InputMaybe<Scalars['u32']['input']>;
  idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  idNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  itemId?: InputMaybe<Scalars['u32']['input']>;
  itemIdEQ?: InputMaybe<Scalars['u32']['input']>;
  itemIdGT?: InputMaybe<Scalars['u32']['input']>;
  itemIdGTE?: InputMaybe<Scalars['u32']['input']>;
  itemIdIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  itemIdLIKE?: InputMaybe<Scalars['u32']['input']>;
  itemIdLT?: InputMaybe<Scalars['u32']['input']>;
  itemIdLTE?: InputMaybe<Scalars['u32']['input']>;
  itemIdNEQ?: InputMaybe<Scalars['u32']['input']>;
  itemIdNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  itemIdNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type CharacterItemsInventoryCounter = {
  __typename?: 'CharacterItemsInventoryCounter';
  count?: Maybe<Scalars['u32']['output']>;
  entity?: Maybe<World__Entity>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
};

export type CharacterItemsInventoryCounterConnection = {
  __typename?: 'CharacterItemsInventoryCounterConnection';
  edges?: Maybe<Array<Maybe<CharacterItemsInventoryCounterEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CharacterItemsInventoryCounterEdge = {
  __typename?: 'CharacterItemsInventoryCounterEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<CharacterItemsInventoryCounter>;
};

export type CharacterItemsInventoryCounterOrder = {
  direction: OrderDirection;
  field: CharacterItemsInventoryCounterOrderField;
};

export enum CharacterItemsInventoryCounterOrderField {
  Count = 'COUNT',
  Player = 'PLAYER'
}

export type CharacterItemsInventoryCounterWhereInput = {
  count?: InputMaybe<Scalars['u32']['input']>;
  countEQ?: InputMaybe<Scalars['u32']['input']>;
  countGT?: InputMaybe<Scalars['u32']['input']>;
  countGTE?: InputMaybe<Scalars['u32']['input']>;
  countIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  countLIKE?: InputMaybe<Scalars['u32']['input']>;
  countLT?: InputMaybe<Scalars['u32']['input']>;
  countLTE?: InputMaybe<Scalars['u32']['input']>;
  countNEQ?: InputMaybe<Scalars['u32']['input']>;
  countNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  countNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type CharacterItemsStorageCounter = {
  __typename?: 'CharacterItemsStorageCounter';
  count?: Maybe<Scalars['u32']['output']>;
  entity?: Maybe<World__Entity>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
};

export type CharacterItemsStorageCounterConnection = {
  __typename?: 'CharacterItemsStorageCounterConnection';
  edges?: Maybe<Array<Maybe<CharacterItemsStorageCounterEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CharacterItemsStorageCounterEdge = {
  __typename?: 'CharacterItemsStorageCounterEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<CharacterItemsStorageCounter>;
};

export type CharacterItemsStorageCounterOrder = {
  direction: OrderDirection;
  field: CharacterItemsStorageCounterOrderField;
};

export enum CharacterItemsStorageCounterOrderField {
  Count = 'COUNT',
  Player = 'PLAYER'
}

export type CharacterItemsStorageCounterWhereInput = {
  count?: InputMaybe<Scalars['u32']['input']>;
  countEQ?: InputMaybe<Scalars['u32']['input']>;
  countGT?: InputMaybe<Scalars['u32']['input']>;
  countGTE?: InputMaybe<Scalars['u32']['input']>;
  countIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  countLIKE?: InputMaybe<Scalars['u32']['input']>;
  countLT?: InputMaybe<Scalars['u32']['input']>;
  countLTE?: InputMaybe<Scalars['u32']['input']>;
  countNEQ?: InputMaybe<Scalars['u32']['input']>;
  countNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  countNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type CharacterOrder = {
  direction: OrderDirection;
  field: CharacterOrderField;
};

export enum CharacterOrderField {
  Birthcount = 'BIRTHCOUNT',
  Dummied = 'DUMMIED',
  Gold = 'GOLD',
  Health = 'HEALTH',
  Loss = 'LOSS',
  Name = 'NAME',
  Player = 'PLAYER',
  Rating = 'RATING',
  Totalloss = 'TOTALLOSS',
  Totalwins = 'TOTALWINS',
  Updatedat = 'UPDATEDAT',
  Wins = 'WINS',
  Winstreak = 'WINSTREAK'
}

export type CharacterWhereInput = {
  birthCount?: InputMaybe<Scalars['u32']['input']>;
  birthCountEQ?: InputMaybe<Scalars['u32']['input']>;
  birthCountGT?: InputMaybe<Scalars['u32']['input']>;
  birthCountGTE?: InputMaybe<Scalars['u32']['input']>;
  birthCountIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  birthCountLIKE?: InputMaybe<Scalars['u32']['input']>;
  birthCountLT?: InputMaybe<Scalars['u32']['input']>;
  birthCountLTE?: InputMaybe<Scalars['u32']['input']>;
  birthCountNEQ?: InputMaybe<Scalars['u32']['input']>;
  birthCountNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  birthCountNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  dummied?: InputMaybe<Scalars['bool']['input']>;
  gold?: InputMaybe<Scalars['u32']['input']>;
  goldEQ?: InputMaybe<Scalars['u32']['input']>;
  goldGT?: InputMaybe<Scalars['u32']['input']>;
  goldGTE?: InputMaybe<Scalars['u32']['input']>;
  goldIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  goldLIKE?: InputMaybe<Scalars['u32']['input']>;
  goldLT?: InputMaybe<Scalars['u32']['input']>;
  goldLTE?: InputMaybe<Scalars['u32']['input']>;
  goldNEQ?: InputMaybe<Scalars['u32']['input']>;
  goldNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  goldNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  health?: InputMaybe<Scalars['u32']['input']>;
  healthEQ?: InputMaybe<Scalars['u32']['input']>;
  healthGT?: InputMaybe<Scalars['u32']['input']>;
  healthGTE?: InputMaybe<Scalars['u32']['input']>;
  healthIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  healthLIKE?: InputMaybe<Scalars['u32']['input']>;
  healthLT?: InputMaybe<Scalars['u32']['input']>;
  healthLTE?: InputMaybe<Scalars['u32']['input']>;
  healthNEQ?: InputMaybe<Scalars['u32']['input']>;
  healthNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  healthNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  loss?: InputMaybe<Scalars['u32']['input']>;
  lossEQ?: InputMaybe<Scalars['u32']['input']>;
  lossGT?: InputMaybe<Scalars['u32']['input']>;
  lossGTE?: InputMaybe<Scalars['u32']['input']>;
  lossIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  lossLIKE?: InputMaybe<Scalars['u32']['input']>;
  lossLT?: InputMaybe<Scalars['u32']['input']>;
  lossLTE?: InputMaybe<Scalars['u32']['input']>;
  lossNEQ?: InputMaybe<Scalars['u32']['input']>;
  lossNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  lossNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  name?: InputMaybe<Scalars['felt252']['input']>;
  nameEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameGT?: InputMaybe<Scalars['felt252']['input']>;
  nameGTE?: InputMaybe<Scalars['felt252']['input']>;
  nameIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  nameLIKE?: InputMaybe<Scalars['felt252']['input']>;
  nameLT?: InputMaybe<Scalars['felt252']['input']>;
  nameLTE?: InputMaybe<Scalars['felt252']['input']>;
  nameNEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  nameNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  rating?: InputMaybe<Scalars['u32']['input']>;
  ratingEQ?: InputMaybe<Scalars['u32']['input']>;
  ratingGT?: InputMaybe<Scalars['u32']['input']>;
  ratingGTE?: InputMaybe<Scalars['u32']['input']>;
  ratingIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  ratingLIKE?: InputMaybe<Scalars['u32']['input']>;
  ratingLT?: InputMaybe<Scalars['u32']['input']>;
  ratingLTE?: InputMaybe<Scalars['u32']['input']>;
  ratingNEQ?: InputMaybe<Scalars['u32']['input']>;
  ratingNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  ratingNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  totalLoss?: InputMaybe<Scalars['u32']['input']>;
  totalLossEQ?: InputMaybe<Scalars['u32']['input']>;
  totalLossGT?: InputMaybe<Scalars['u32']['input']>;
  totalLossGTE?: InputMaybe<Scalars['u32']['input']>;
  totalLossIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  totalLossLIKE?: InputMaybe<Scalars['u32']['input']>;
  totalLossLT?: InputMaybe<Scalars['u32']['input']>;
  totalLossLTE?: InputMaybe<Scalars['u32']['input']>;
  totalLossNEQ?: InputMaybe<Scalars['u32']['input']>;
  totalLossNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  totalLossNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  totalWins?: InputMaybe<Scalars['u32']['input']>;
  totalWinsEQ?: InputMaybe<Scalars['u32']['input']>;
  totalWinsGT?: InputMaybe<Scalars['u32']['input']>;
  totalWinsGTE?: InputMaybe<Scalars['u32']['input']>;
  totalWinsIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  totalWinsLIKE?: InputMaybe<Scalars['u32']['input']>;
  totalWinsLT?: InputMaybe<Scalars['u32']['input']>;
  totalWinsLTE?: InputMaybe<Scalars['u32']['input']>;
  totalWinsNEQ?: InputMaybe<Scalars['u32']['input']>;
  totalWinsNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  totalWinsNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  updatedAt?: InputMaybe<Scalars['u64']['input']>;
  updatedAtEQ?: InputMaybe<Scalars['u64']['input']>;
  updatedAtGT?: InputMaybe<Scalars['u64']['input']>;
  updatedAtGTE?: InputMaybe<Scalars['u64']['input']>;
  updatedAtIN?: InputMaybe<Array<InputMaybe<Scalars['u64']['input']>>>;
  updatedAtLIKE?: InputMaybe<Scalars['u64']['input']>;
  updatedAtLT?: InputMaybe<Scalars['u64']['input']>;
  updatedAtLTE?: InputMaybe<Scalars['u64']['input']>;
  updatedAtNEQ?: InputMaybe<Scalars['u64']['input']>;
  updatedAtNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u64']['input']>>>;
  updatedAtNOTLIKE?: InputMaybe<Scalars['u64']['input']>;
  winStreak?: InputMaybe<Scalars['u32']['input']>;
  winStreakEQ?: InputMaybe<Scalars['u32']['input']>;
  winStreakGT?: InputMaybe<Scalars['u32']['input']>;
  winStreakGTE?: InputMaybe<Scalars['u32']['input']>;
  winStreakIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  winStreakLIKE?: InputMaybe<Scalars['u32']['input']>;
  winStreakLT?: InputMaybe<Scalars['u32']['input']>;
  winStreakLTE?: InputMaybe<Scalars['u32']['input']>;
  winStreakNEQ?: InputMaybe<Scalars['u32']['input']>;
  winStreakNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  winStreakNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  wins?: InputMaybe<Scalars['u32']['input']>;
  winsEQ?: InputMaybe<Scalars['u32']['input']>;
  winsGT?: InputMaybe<Scalars['u32']['input']>;
  winsGTE?: InputMaybe<Scalars['u32']['input']>;
  winsIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  winsLIKE?: InputMaybe<Scalars['u32']['input']>;
  winsLT?: InputMaybe<Scalars['u32']['input']>;
  winsLTE?: InputMaybe<Scalars['u32']['input']>;
  winsNEQ?: InputMaybe<Scalars['u32']['input']>;
  winsNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  winsNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
};

export type DummyCharacter = {
  __typename?: 'DummyCharacter';
  entity?: Maybe<World__Entity>;
  health?: Maybe<Scalars['u32']['output']>;
  id?: Maybe<Scalars['u32']['output']>;
  level?: Maybe<Scalars['u32']['output']>;
  name?: Maybe<Scalars['felt252']['output']>;
};

export type DummyCharacterConnection = {
  __typename?: 'DummyCharacterConnection';
  edges?: Maybe<Array<Maybe<DummyCharacterEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DummyCharacterCounter = {
  __typename?: 'DummyCharacterCounter';
  count?: Maybe<Scalars['u32']['output']>;
  entity?: Maybe<World__Entity>;
  level?: Maybe<Scalars['u32']['output']>;
};

export type DummyCharacterCounterConnection = {
  __typename?: 'DummyCharacterCounterConnection';
  edges?: Maybe<Array<Maybe<DummyCharacterCounterEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DummyCharacterCounterEdge = {
  __typename?: 'DummyCharacterCounterEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<DummyCharacterCounter>;
};

export type DummyCharacterCounterOrder = {
  direction: OrderDirection;
  field: DummyCharacterCounterOrderField;
};

export enum DummyCharacterCounterOrderField {
  Count = 'COUNT',
  Level = 'LEVEL'
}

export type DummyCharacterCounterWhereInput = {
  count?: InputMaybe<Scalars['u32']['input']>;
  countEQ?: InputMaybe<Scalars['u32']['input']>;
  countGT?: InputMaybe<Scalars['u32']['input']>;
  countGTE?: InputMaybe<Scalars['u32']['input']>;
  countIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  countLIKE?: InputMaybe<Scalars['u32']['input']>;
  countLT?: InputMaybe<Scalars['u32']['input']>;
  countLTE?: InputMaybe<Scalars['u32']['input']>;
  countNEQ?: InputMaybe<Scalars['u32']['input']>;
  countNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  countNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  level?: InputMaybe<Scalars['u32']['input']>;
  levelEQ?: InputMaybe<Scalars['u32']['input']>;
  levelGT?: InputMaybe<Scalars['u32']['input']>;
  levelGTE?: InputMaybe<Scalars['u32']['input']>;
  levelIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  levelLIKE?: InputMaybe<Scalars['u32']['input']>;
  levelLT?: InputMaybe<Scalars['u32']['input']>;
  levelLTE?: InputMaybe<Scalars['u32']['input']>;
  levelNEQ?: InputMaybe<Scalars['u32']['input']>;
  levelNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  levelNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
};

export type DummyCharacterEdge = {
  __typename?: 'DummyCharacterEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<DummyCharacter>;
};

export type DummyCharacterItem = {
  __typename?: 'DummyCharacterItem';
  counterId?: Maybe<Scalars['u32']['output']>;
  dummyCharId?: Maybe<Scalars['u32']['output']>;
  entity?: Maybe<World__Entity>;
  itemId?: Maybe<Scalars['u32']['output']>;
  level?: Maybe<Scalars['u32']['output']>;
  position?: Maybe<DummyCharacterItem_Position>;
  rotation?: Maybe<Scalars['u32']['output']>;
};

export type DummyCharacterItemConnection = {
  __typename?: 'DummyCharacterItemConnection';
  edges?: Maybe<Array<Maybe<DummyCharacterItemEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DummyCharacterItemEdge = {
  __typename?: 'DummyCharacterItemEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<DummyCharacterItem>;
};

export type DummyCharacterItemOrder = {
  direction: OrderDirection;
  field: DummyCharacterItemOrderField;
};

export enum DummyCharacterItemOrderField {
  Counterid = 'COUNTERID',
  Dummycharid = 'DUMMYCHARID',
  Itemid = 'ITEMID',
  Level = 'LEVEL',
  Position = 'POSITION',
  Rotation = 'ROTATION'
}

export type DummyCharacterItemWhereInput = {
  counterId?: InputMaybe<Scalars['u32']['input']>;
  counterIdEQ?: InputMaybe<Scalars['u32']['input']>;
  counterIdGT?: InputMaybe<Scalars['u32']['input']>;
  counterIdGTE?: InputMaybe<Scalars['u32']['input']>;
  counterIdIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  counterIdLIKE?: InputMaybe<Scalars['u32']['input']>;
  counterIdLT?: InputMaybe<Scalars['u32']['input']>;
  counterIdLTE?: InputMaybe<Scalars['u32']['input']>;
  counterIdNEQ?: InputMaybe<Scalars['u32']['input']>;
  counterIdNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  counterIdNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  dummyCharId?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdEQ?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdGT?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdGTE?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  dummyCharIdLIKE?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdLT?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdLTE?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdNEQ?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  dummyCharIdNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  itemId?: InputMaybe<Scalars['u32']['input']>;
  itemIdEQ?: InputMaybe<Scalars['u32']['input']>;
  itemIdGT?: InputMaybe<Scalars['u32']['input']>;
  itemIdGTE?: InputMaybe<Scalars['u32']['input']>;
  itemIdIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  itemIdLIKE?: InputMaybe<Scalars['u32']['input']>;
  itemIdLT?: InputMaybe<Scalars['u32']['input']>;
  itemIdLTE?: InputMaybe<Scalars['u32']['input']>;
  itemIdNEQ?: InputMaybe<Scalars['u32']['input']>;
  itemIdNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  itemIdNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  level?: InputMaybe<Scalars['u32']['input']>;
  levelEQ?: InputMaybe<Scalars['u32']['input']>;
  levelGT?: InputMaybe<Scalars['u32']['input']>;
  levelGTE?: InputMaybe<Scalars['u32']['input']>;
  levelIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  levelLIKE?: InputMaybe<Scalars['u32']['input']>;
  levelLT?: InputMaybe<Scalars['u32']['input']>;
  levelLTE?: InputMaybe<Scalars['u32']['input']>;
  levelNEQ?: InputMaybe<Scalars['u32']['input']>;
  levelNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  levelNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  rotation?: InputMaybe<Scalars['u32']['input']>;
  rotationEQ?: InputMaybe<Scalars['u32']['input']>;
  rotationGT?: InputMaybe<Scalars['u32']['input']>;
  rotationGTE?: InputMaybe<Scalars['u32']['input']>;
  rotationIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  rotationLIKE?: InputMaybe<Scalars['u32']['input']>;
  rotationLT?: InputMaybe<Scalars['u32']['input']>;
  rotationLTE?: InputMaybe<Scalars['u32']['input']>;
  rotationNEQ?: InputMaybe<Scalars['u32']['input']>;
  rotationNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  rotationNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
};

export type DummyCharacterItem_Position = {
  __typename?: 'DummyCharacterItem_Position';
  x?: Maybe<Scalars['u32']['output']>;
  y?: Maybe<Scalars['u32']['output']>;
};

export type DummyCharacterItemsCounter = {
  __typename?: 'DummyCharacterItemsCounter';
  count?: Maybe<Scalars['u32']['output']>;
  dummyCharId?: Maybe<Scalars['u32']['output']>;
  entity?: Maybe<World__Entity>;
  level?: Maybe<Scalars['u32']['output']>;
};

export type DummyCharacterItemsCounterConnection = {
  __typename?: 'DummyCharacterItemsCounterConnection';
  edges?: Maybe<Array<Maybe<DummyCharacterItemsCounterEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type DummyCharacterItemsCounterEdge = {
  __typename?: 'DummyCharacterItemsCounterEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<DummyCharacterItemsCounter>;
};

export type DummyCharacterItemsCounterOrder = {
  direction: OrderDirection;
  field: DummyCharacterItemsCounterOrderField;
};

export enum DummyCharacterItemsCounterOrderField {
  Count = 'COUNT',
  Dummycharid = 'DUMMYCHARID',
  Level = 'LEVEL'
}

export type DummyCharacterItemsCounterWhereInput = {
  count?: InputMaybe<Scalars['u32']['input']>;
  countEQ?: InputMaybe<Scalars['u32']['input']>;
  countGT?: InputMaybe<Scalars['u32']['input']>;
  countGTE?: InputMaybe<Scalars['u32']['input']>;
  countIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  countLIKE?: InputMaybe<Scalars['u32']['input']>;
  countLT?: InputMaybe<Scalars['u32']['input']>;
  countLTE?: InputMaybe<Scalars['u32']['input']>;
  countNEQ?: InputMaybe<Scalars['u32']['input']>;
  countNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  countNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  dummyCharId?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdEQ?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdGT?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdGTE?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  dummyCharIdLIKE?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdLT?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdLTE?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdNEQ?: InputMaybe<Scalars['u32']['input']>;
  dummyCharIdNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  dummyCharIdNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  level?: InputMaybe<Scalars['u32']['input']>;
  levelEQ?: InputMaybe<Scalars['u32']['input']>;
  levelGT?: InputMaybe<Scalars['u32']['input']>;
  levelGTE?: InputMaybe<Scalars['u32']['input']>;
  levelIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  levelLIKE?: InputMaybe<Scalars['u32']['input']>;
  levelLT?: InputMaybe<Scalars['u32']['input']>;
  levelLTE?: InputMaybe<Scalars['u32']['input']>;
  levelNEQ?: InputMaybe<Scalars['u32']['input']>;
  levelNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  levelNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
};

export type DummyCharacterOrder = {
  direction: OrderDirection;
  field: DummyCharacterOrderField;
};

export enum DummyCharacterOrderField {
  Health = 'HEALTH',
  Id = 'ID',
  Level = 'LEVEL',
  Name = 'NAME'
}

export type DummyCharacterWhereInput = {
  health?: InputMaybe<Scalars['u32']['input']>;
  healthEQ?: InputMaybe<Scalars['u32']['input']>;
  healthGT?: InputMaybe<Scalars['u32']['input']>;
  healthGTE?: InputMaybe<Scalars['u32']['input']>;
  healthIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  healthLIKE?: InputMaybe<Scalars['u32']['input']>;
  healthLT?: InputMaybe<Scalars['u32']['input']>;
  healthLTE?: InputMaybe<Scalars['u32']['input']>;
  healthNEQ?: InputMaybe<Scalars['u32']['input']>;
  healthNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  healthNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  id?: InputMaybe<Scalars['u32']['input']>;
  idEQ?: InputMaybe<Scalars['u32']['input']>;
  idGT?: InputMaybe<Scalars['u32']['input']>;
  idGTE?: InputMaybe<Scalars['u32']['input']>;
  idIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  idLIKE?: InputMaybe<Scalars['u32']['input']>;
  idLT?: InputMaybe<Scalars['u32']['input']>;
  idLTE?: InputMaybe<Scalars['u32']['input']>;
  idNEQ?: InputMaybe<Scalars['u32']['input']>;
  idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  idNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  level?: InputMaybe<Scalars['u32']['input']>;
  levelEQ?: InputMaybe<Scalars['u32']['input']>;
  levelGT?: InputMaybe<Scalars['u32']['input']>;
  levelGTE?: InputMaybe<Scalars['u32']['input']>;
  levelIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  levelLIKE?: InputMaybe<Scalars['u32']['input']>;
  levelLT?: InputMaybe<Scalars['u32']['input']>;
  levelLTE?: InputMaybe<Scalars['u32']['input']>;
  levelNEQ?: InputMaybe<Scalars['u32']['input']>;
  levelNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  levelNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  name?: InputMaybe<Scalars['felt252']['input']>;
  nameEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameGT?: InputMaybe<Scalars['felt252']['input']>;
  nameGTE?: InputMaybe<Scalars['felt252']['input']>;
  nameIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  nameLIKE?: InputMaybe<Scalars['felt252']['input']>;
  nameLT?: InputMaybe<Scalars['felt252']['input']>;
  nameLTE?: InputMaybe<Scalars['felt252']['input']>;
  nameNEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  nameNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
};

export type Item = {
  __typename?: 'Item';
  armor?: Maybe<Scalars['u32']['output']>;
  armorType?: Maybe<Scalars['u8']['output']>;
  chance?: Maybe<Scalars['u32']['output']>;
  consumeStamina?: Maybe<Scalars['u32']['output']>;
  coolTime?: Maybe<Scalars['u8']['output']>;
  damage?: Maybe<Scalars['u32']['output']>;
  entity?: Maybe<World__Entity>;
  height?: Maybe<Scalars['u32']['output']>;
  id?: Maybe<Scalars['u32']['output']>;
  itemType?: Maybe<Scalars['u8']['output']>;
  name?: Maybe<Scalars['felt252']['output']>;
  price?: Maybe<Scalars['u32']['output']>;
  rarity?: Maybe<Scalars['u8']['output']>;
  reflect?: Maybe<Scalars['u32']['output']>;
  reflectType?: Maybe<Scalars['u8']['output']>;
  regen?: Maybe<Scalars['u32']['output']>;
  regenType?: Maybe<Scalars['u8']['output']>;
  shapeType?: Maybe<Scalars['u8']['output']>;
  spike?: Maybe<Scalars['u32']['output']>;
  spikeType?: Maybe<Scalars['u8']['output']>;
  width?: Maybe<Scalars['u32']['output']>;
};

export type ItemConnection = {
  __typename?: 'ItemConnection';
  edges?: Maybe<Array<Maybe<ItemEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ItemEdge = {
  __typename?: 'ItemEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Item>;
};

export type ItemOrder = {
  direction: OrderDirection;
  field: ItemOrderField;
};

export enum ItemOrderField {
  Armor = 'ARMOR',
  Armortype = 'ARMORTYPE',
  Chance = 'CHANCE',
  Consumestamina = 'CONSUMESTAMINA',
  Cooltime = 'COOLTIME',
  Damage = 'DAMAGE',
  Height = 'HEIGHT',
  Id = 'ID',
  Itemtype = 'ITEMTYPE',
  Name = 'NAME',
  Price = 'PRICE',
  Rarity = 'RARITY',
  Reflect = 'REFLECT',
  Reflecttype = 'REFLECTTYPE',
  Regen = 'REGEN',
  Regentype = 'REGENTYPE',
  Shapetype = 'SHAPETYPE',
  Spike = 'SPIKE',
  Spiketype = 'SPIKETYPE',
  Width = 'WIDTH'
}

export type ItemWhereInput = {
  armor?: InputMaybe<Scalars['u32']['input']>;
  armorEQ?: InputMaybe<Scalars['u32']['input']>;
  armorGT?: InputMaybe<Scalars['u32']['input']>;
  armorGTE?: InputMaybe<Scalars['u32']['input']>;
  armorIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  armorLIKE?: InputMaybe<Scalars['u32']['input']>;
  armorLT?: InputMaybe<Scalars['u32']['input']>;
  armorLTE?: InputMaybe<Scalars['u32']['input']>;
  armorNEQ?: InputMaybe<Scalars['u32']['input']>;
  armorNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  armorNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  armorType?: InputMaybe<Scalars['u8']['input']>;
  armorTypeEQ?: InputMaybe<Scalars['u8']['input']>;
  armorTypeGT?: InputMaybe<Scalars['u8']['input']>;
  armorTypeGTE?: InputMaybe<Scalars['u8']['input']>;
  armorTypeIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  armorTypeLIKE?: InputMaybe<Scalars['u8']['input']>;
  armorTypeLT?: InputMaybe<Scalars['u8']['input']>;
  armorTypeLTE?: InputMaybe<Scalars['u8']['input']>;
  armorTypeNEQ?: InputMaybe<Scalars['u8']['input']>;
  armorTypeNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  armorTypeNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  chance?: InputMaybe<Scalars['u32']['input']>;
  chanceEQ?: InputMaybe<Scalars['u32']['input']>;
  chanceGT?: InputMaybe<Scalars['u32']['input']>;
  chanceGTE?: InputMaybe<Scalars['u32']['input']>;
  chanceIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  chanceLIKE?: InputMaybe<Scalars['u32']['input']>;
  chanceLT?: InputMaybe<Scalars['u32']['input']>;
  chanceLTE?: InputMaybe<Scalars['u32']['input']>;
  chanceNEQ?: InputMaybe<Scalars['u32']['input']>;
  chanceNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  chanceNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  consumeStamina?: InputMaybe<Scalars['u32']['input']>;
  consumeStaminaEQ?: InputMaybe<Scalars['u32']['input']>;
  consumeStaminaGT?: InputMaybe<Scalars['u32']['input']>;
  consumeStaminaGTE?: InputMaybe<Scalars['u32']['input']>;
  consumeStaminaIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  consumeStaminaLIKE?: InputMaybe<Scalars['u32']['input']>;
  consumeStaminaLT?: InputMaybe<Scalars['u32']['input']>;
  consumeStaminaLTE?: InputMaybe<Scalars['u32']['input']>;
  consumeStaminaNEQ?: InputMaybe<Scalars['u32']['input']>;
  consumeStaminaNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  consumeStaminaNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  coolTime?: InputMaybe<Scalars['u8']['input']>;
  coolTimeEQ?: InputMaybe<Scalars['u8']['input']>;
  coolTimeGT?: InputMaybe<Scalars['u8']['input']>;
  coolTimeGTE?: InputMaybe<Scalars['u8']['input']>;
  coolTimeIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  coolTimeLIKE?: InputMaybe<Scalars['u8']['input']>;
  coolTimeLT?: InputMaybe<Scalars['u8']['input']>;
  coolTimeLTE?: InputMaybe<Scalars['u8']['input']>;
  coolTimeNEQ?: InputMaybe<Scalars['u8']['input']>;
  coolTimeNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  coolTimeNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  damage?: InputMaybe<Scalars['u32']['input']>;
  damageEQ?: InputMaybe<Scalars['u32']['input']>;
  damageGT?: InputMaybe<Scalars['u32']['input']>;
  damageGTE?: InputMaybe<Scalars['u32']['input']>;
  damageIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  damageLIKE?: InputMaybe<Scalars['u32']['input']>;
  damageLT?: InputMaybe<Scalars['u32']['input']>;
  damageLTE?: InputMaybe<Scalars['u32']['input']>;
  damageNEQ?: InputMaybe<Scalars['u32']['input']>;
  damageNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  damageNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  height?: InputMaybe<Scalars['u32']['input']>;
  heightEQ?: InputMaybe<Scalars['u32']['input']>;
  heightGT?: InputMaybe<Scalars['u32']['input']>;
  heightGTE?: InputMaybe<Scalars['u32']['input']>;
  heightIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  heightLIKE?: InputMaybe<Scalars['u32']['input']>;
  heightLT?: InputMaybe<Scalars['u32']['input']>;
  heightLTE?: InputMaybe<Scalars['u32']['input']>;
  heightNEQ?: InputMaybe<Scalars['u32']['input']>;
  heightNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  heightNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  id?: InputMaybe<Scalars['u32']['input']>;
  idEQ?: InputMaybe<Scalars['u32']['input']>;
  idGT?: InputMaybe<Scalars['u32']['input']>;
  idGTE?: InputMaybe<Scalars['u32']['input']>;
  idIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  idLIKE?: InputMaybe<Scalars['u32']['input']>;
  idLT?: InputMaybe<Scalars['u32']['input']>;
  idLTE?: InputMaybe<Scalars['u32']['input']>;
  idNEQ?: InputMaybe<Scalars['u32']['input']>;
  idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  idNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  itemType?: InputMaybe<Scalars['u8']['input']>;
  itemTypeEQ?: InputMaybe<Scalars['u8']['input']>;
  itemTypeGT?: InputMaybe<Scalars['u8']['input']>;
  itemTypeGTE?: InputMaybe<Scalars['u8']['input']>;
  itemTypeIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  itemTypeLIKE?: InputMaybe<Scalars['u8']['input']>;
  itemTypeLT?: InputMaybe<Scalars['u8']['input']>;
  itemTypeLTE?: InputMaybe<Scalars['u8']['input']>;
  itemTypeNEQ?: InputMaybe<Scalars['u8']['input']>;
  itemTypeNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  itemTypeNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  name?: InputMaybe<Scalars['felt252']['input']>;
  nameEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameGT?: InputMaybe<Scalars['felt252']['input']>;
  nameGTE?: InputMaybe<Scalars['felt252']['input']>;
  nameIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  nameLIKE?: InputMaybe<Scalars['felt252']['input']>;
  nameLT?: InputMaybe<Scalars['felt252']['input']>;
  nameLTE?: InputMaybe<Scalars['felt252']['input']>;
  nameNEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  nameNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  price?: InputMaybe<Scalars['u32']['input']>;
  priceEQ?: InputMaybe<Scalars['u32']['input']>;
  priceGT?: InputMaybe<Scalars['u32']['input']>;
  priceGTE?: InputMaybe<Scalars['u32']['input']>;
  priceIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  priceLIKE?: InputMaybe<Scalars['u32']['input']>;
  priceLT?: InputMaybe<Scalars['u32']['input']>;
  priceLTE?: InputMaybe<Scalars['u32']['input']>;
  priceNEQ?: InputMaybe<Scalars['u32']['input']>;
  priceNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  priceNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  rarity?: InputMaybe<Scalars['u8']['input']>;
  rarityEQ?: InputMaybe<Scalars['u8']['input']>;
  rarityGT?: InputMaybe<Scalars['u8']['input']>;
  rarityGTE?: InputMaybe<Scalars['u8']['input']>;
  rarityIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  rarityLIKE?: InputMaybe<Scalars['u8']['input']>;
  rarityLT?: InputMaybe<Scalars['u8']['input']>;
  rarityLTE?: InputMaybe<Scalars['u8']['input']>;
  rarityNEQ?: InputMaybe<Scalars['u8']['input']>;
  rarityNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  rarityNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  reflect?: InputMaybe<Scalars['u32']['input']>;
  reflectEQ?: InputMaybe<Scalars['u32']['input']>;
  reflectGT?: InputMaybe<Scalars['u32']['input']>;
  reflectGTE?: InputMaybe<Scalars['u32']['input']>;
  reflectIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  reflectLIKE?: InputMaybe<Scalars['u32']['input']>;
  reflectLT?: InputMaybe<Scalars['u32']['input']>;
  reflectLTE?: InputMaybe<Scalars['u32']['input']>;
  reflectNEQ?: InputMaybe<Scalars['u32']['input']>;
  reflectNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  reflectNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  reflectType?: InputMaybe<Scalars['u8']['input']>;
  reflectTypeEQ?: InputMaybe<Scalars['u8']['input']>;
  reflectTypeGT?: InputMaybe<Scalars['u8']['input']>;
  reflectTypeGTE?: InputMaybe<Scalars['u8']['input']>;
  reflectTypeIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  reflectTypeLIKE?: InputMaybe<Scalars['u8']['input']>;
  reflectTypeLT?: InputMaybe<Scalars['u8']['input']>;
  reflectTypeLTE?: InputMaybe<Scalars['u8']['input']>;
  reflectTypeNEQ?: InputMaybe<Scalars['u8']['input']>;
  reflectTypeNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  reflectTypeNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  regen?: InputMaybe<Scalars['u32']['input']>;
  regenEQ?: InputMaybe<Scalars['u32']['input']>;
  regenGT?: InputMaybe<Scalars['u32']['input']>;
  regenGTE?: InputMaybe<Scalars['u32']['input']>;
  regenIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  regenLIKE?: InputMaybe<Scalars['u32']['input']>;
  regenLT?: InputMaybe<Scalars['u32']['input']>;
  regenLTE?: InputMaybe<Scalars['u32']['input']>;
  regenNEQ?: InputMaybe<Scalars['u32']['input']>;
  regenNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  regenNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  regenType?: InputMaybe<Scalars['u8']['input']>;
  regenTypeEQ?: InputMaybe<Scalars['u8']['input']>;
  regenTypeGT?: InputMaybe<Scalars['u8']['input']>;
  regenTypeGTE?: InputMaybe<Scalars['u8']['input']>;
  regenTypeIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  regenTypeLIKE?: InputMaybe<Scalars['u8']['input']>;
  regenTypeLT?: InputMaybe<Scalars['u8']['input']>;
  regenTypeLTE?: InputMaybe<Scalars['u8']['input']>;
  regenTypeNEQ?: InputMaybe<Scalars['u8']['input']>;
  regenTypeNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  regenTypeNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  shapeType?: InputMaybe<Scalars['u8']['input']>;
  shapeTypeEQ?: InputMaybe<Scalars['u8']['input']>;
  shapeTypeGT?: InputMaybe<Scalars['u8']['input']>;
  shapeTypeGTE?: InputMaybe<Scalars['u8']['input']>;
  shapeTypeIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  shapeTypeLIKE?: InputMaybe<Scalars['u8']['input']>;
  shapeTypeLT?: InputMaybe<Scalars['u8']['input']>;
  shapeTypeLTE?: InputMaybe<Scalars['u8']['input']>;
  shapeTypeNEQ?: InputMaybe<Scalars['u8']['input']>;
  shapeTypeNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  shapeTypeNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  spike?: InputMaybe<Scalars['u32']['input']>;
  spikeEQ?: InputMaybe<Scalars['u32']['input']>;
  spikeGT?: InputMaybe<Scalars['u32']['input']>;
  spikeGTE?: InputMaybe<Scalars['u32']['input']>;
  spikeIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  spikeLIKE?: InputMaybe<Scalars['u32']['input']>;
  spikeLT?: InputMaybe<Scalars['u32']['input']>;
  spikeLTE?: InputMaybe<Scalars['u32']['input']>;
  spikeNEQ?: InputMaybe<Scalars['u32']['input']>;
  spikeNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  spikeNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  spikeType?: InputMaybe<Scalars['u8']['input']>;
  spikeTypeEQ?: InputMaybe<Scalars['u8']['input']>;
  spikeTypeGT?: InputMaybe<Scalars['u8']['input']>;
  spikeTypeGTE?: InputMaybe<Scalars['u8']['input']>;
  spikeTypeIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  spikeTypeLIKE?: InputMaybe<Scalars['u8']['input']>;
  spikeTypeLT?: InputMaybe<Scalars['u8']['input']>;
  spikeTypeLTE?: InputMaybe<Scalars['u8']['input']>;
  spikeTypeNEQ?: InputMaybe<Scalars['u8']['input']>;
  spikeTypeNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u8']['input']>>>;
  spikeTypeNOTLIKE?: InputMaybe<Scalars['u8']['input']>;
  width?: InputMaybe<Scalars['u32']['input']>;
  widthEQ?: InputMaybe<Scalars['u32']['input']>;
  widthGT?: InputMaybe<Scalars['u32']['input']>;
  widthGTE?: InputMaybe<Scalars['u32']['input']>;
  widthIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  widthLIKE?: InputMaybe<Scalars['u32']['input']>;
  widthLT?: InputMaybe<Scalars['u32']['input']>;
  widthLTE?: InputMaybe<Scalars['u32']['input']>;
  widthNEQ?: InputMaybe<Scalars['u32']['input']>;
  widthNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  widthNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
};

export type ItemsCounter = {
  __typename?: 'ItemsCounter';
  count?: Maybe<Scalars['u32']['output']>;
  entity?: Maybe<World__Entity>;
  id?: Maybe<Scalars['felt252']['output']>;
};

export type ItemsCounterConnection = {
  __typename?: 'ItemsCounterConnection';
  edges?: Maybe<Array<Maybe<ItemsCounterEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ItemsCounterEdge = {
  __typename?: 'ItemsCounterEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<ItemsCounter>;
};

export type ItemsCounterOrder = {
  direction: OrderDirection;
  field: ItemsCounterOrderField;
};

export enum ItemsCounterOrderField {
  Count = 'COUNT',
  Id = 'ID'
}

export type ItemsCounterWhereInput = {
  count?: InputMaybe<Scalars['u32']['input']>;
  countEQ?: InputMaybe<Scalars['u32']['input']>;
  countGT?: InputMaybe<Scalars['u32']['input']>;
  countGTE?: InputMaybe<Scalars['u32']['input']>;
  countIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  countLIKE?: InputMaybe<Scalars['u32']['input']>;
  countLT?: InputMaybe<Scalars['u32']['input']>;
  countLTE?: InputMaybe<Scalars['u32']['input']>;
  countNEQ?: InputMaybe<Scalars['u32']['input']>;
  countNOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  countNOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  id?: InputMaybe<Scalars['felt252']['input']>;
  idEQ?: InputMaybe<Scalars['felt252']['input']>;
  idGT?: InputMaybe<Scalars['felt252']['input']>;
  idGTE?: InputMaybe<Scalars['felt252']['input']>;
  idIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  idLIKE?: InputMaybe<Scalars['felt252']['input']>;
  idLT?: InputMaybe<Scalars['felt252']['input']>;
  idLTE?: InputMaybe<Scalars['felt252']['input']>;
  idNEQ?: InputMaybe<Scalars['felt252']['input']>;
  idNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  idNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
};

export type ModelUnion = BackpackGrids | BattleLog | BattleLogCounter | BattleLogDetail | Character | CharacterItemInventory | CharacterItemStorage | CharacterItemsInventoryCounter | CharacterItemsStorageCounter | DummyCharacter | DummyCharacterCounter | DummyCharacterItem | DummyCharacterItemsCounter | Item | ItemsCounter | NameRecord | Shop;

export type NameRecord = {
  __typename?: 'NameRecord';
  entity?: Maybe<World__Entity>;
  name?: Maybe<Scalars['felt252']['output']>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
};

export type NameRecordConnection = {
  __typename?: 'NameRecordConnection';
  edges?: Maybe<Array<Maybe<NameRecordEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type NameRecordEdge = {
  __typename?: 'NameRecordEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<NameRecord>;
};

export type NameRecordOrder = {
  direction: OrderDirection;
  field: NameRecordOrderField;
};

export enum NameRecordOrderField {
  Name = 'NAME',
  Player = 'PLAYER'
}

export type NameRecordWhereInput = {
  name?: InputMaybe<Scalars['felt252']['input']>;
  nameEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameGT?: InputMaybe<Scalars['felt252']['input']>;
  nameGTE?: InputMaybe<Scalars['felt252']['input']>;
  nameIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  nameLIKE?: InputMaybe<Scalars['felt252']['input']>;
  nameLT?: InputMaybe<Scalars['felt252']['input']>;
  nameLTE?: InputMaybe<Scalars['felt252']['input']>;
  nameNEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameNOTIN?: InputMaybe<Array<InputMaybe<Scalars['felt252']['input']>>>;
  nameNOTLIKE?: InputMaybe<Scalars['felt252']['input']>;
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Shop = {
  __typename?: 'Shop';
  entity?: Maybe<World__Entity>;
  item1?: Maybe<Scalars['u32']['output']>;
  item2?: Maybe<Scalars['u32']['output']>;
  item3?: Maybe<Scalars['u32']['output']>;
  item4?: Maybe<Scalars['u32']['output']>;
  item5?: Maybe<Scalars['u32']['output']>;
  item6?: Maybe<Scalars['u32']['output']>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
};

export type ShopConnection = {
  __typename?: 'ShopConnection';
  edges?: Maybe<Array<Maybe<ShopEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ShopEdge = {
  __typename?: 'ShopEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Shop>;
};

export type ShopOrder = {
  direction: OrderDirection;
  field: ShopOrderField;
};

export enum ShopOrderField {
  Item1 = 'ITEM1',
  Item2 = 'ITEM2',
  Item3 = 'ITEM3',
  Item4 = 'ITEM4',
  Item5 = 'ITEM5',
  Item6 = 'ITEM6',
  Player = 'PLAYER'
}

export type ShopWhereInput = {
  item1?: InputMaybe<Scalars['u32']['input']>;
  item1EQ?: InputMaybe<Scalars['u32']['input']>;
  item1GT?: InputMaybe<Scalars['u32']['input']>;
  item1GTE?: InputMaybe<Scalars['u32']['input']>;
  item1IN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  item1LIKE?: InputMaybe<Scalars['u32']['input']>;
  item1LT?: InputMaybe<Scalars['u32']['input']>;
  item1LTE?: InputMaybe<Scalars['u32']['input']>;
  item1NEQ?: InputMaybe<Scalars['u32']['input']>;
  item1NOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  item1NOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  item2?: InputMaybe<Scalars['u32']['input']>;
  item2EQ?: InputMaybe<Scalars['u32']['input']>;
  item2GT?: InputMaybe<Scalars['u32']['input']>;
  item2GTE?: InputMaybe<Scalars['u32']['input']>;
  item2IN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  item2LIKE?: InputMaybe<Scalars['u32']['input']>;
  item2LT?: InputMaybe<Scalars['u32']['input']>;
  item2LTE?: InputMaybe<Scalars['u32']['input']>;
  item2NEQ?: InputMaybe<Scalars['u32']['input']>;
  item2NOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  item2NOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  item3?: InputMaybe<Scalars['u32']['input']>;
  item3EQ?: InputMaybe<Scalars['u32']['input']>;
  item3GT?: InputMaybe<Scalars['u32']['input']>;
  item3GTE?: InputMaybe<Scalars['u32']['input']>;
  item3IN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  item3LIKE?: InputMaybe<Scalars['u32']['input']>;
  item3LT?: InputMaybe<Scalars['u32']['input']>;
  item3LTE?: InputMaybe<Scalars['u32']['input']>;
  item3NEQ?: InputMaybe<Scalars['u32']['input']>;
  item3NOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  item3NOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  item4?: InputMaybe<Scalars['u32']['input']>;
  item4EQ?: InputMaybe<Scalars['u32']['input']>;
  item4GT?: InputMaybe<Scalars['u32']['input']>;
  item4GTE?: InputMaybe<Scalars['u32']['input']>;
  item4IN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  item4LIKE?: InputMaybe<Scalars['u32']['input']>;
  item4LT?: InputMaybe<Scalars['u32']['input']>;
  item4LTE?: InputMaybe<Scalars['u32']['input']>;
  item4NEQ?: InputMaybe<Scalars['u32']['input']>;
  item4NOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  item4NOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  item5?: InputMaybe<Scalars['u32']['input']>;
  item5EQ?: InputMaybe<Scalars['u32']['input']>;
  item5GT?: InputMaybe<Scalars['u32']['input']>;
  item5GTE?: InputMaybe<Scalars['u32']['input']>;
  item5IN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  item5LIKE?: InputMaybe<Scalars['u32']['input']>;
  item5LT?: InputMaybe<Scalars['u32']['input']>;
  item5LTE?: InputMaybe<Scalars['u32']['input']>;
  item5NEQ?: InputMaybe<Scalars['u32']['input']>;
  item5NOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  item5NOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  item6?: InputMaybe<Scalars['u32']['input']>;
  item6EQ?: InputMaybe<Scalars['u32']['input']>;
  item6GT?: InputMaybe<Scalars['u32']['input']>;
  item6GTE?: InputMaybe<Scalars['u32']['input']>;
  item6IN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  item6LIKE?: InputMaybe<Scalars['u32']['input']>;
  item6LT?: InputMaybe<Scalars['u32']['input']>;
  item6LTE?: InputMaybe<Scalars['u32']['input']>;
  item6NEQ?: InputMaybe<Scalars['u32']['input']>;
  item6NOTIN?: InputMaybe<Array<InputMaybe<Scalars['u32']['input']>>>;
  item6NOTLIKE?: InputMaybe<Scalars['u32']['input']>;
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNOTIN?: InputMaybe<Array<InputMaybe<Scalars['ContractAddress']['input']>>>;
  playerNOTLIKE?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type World__Content = {
  __typename?: 'World__Content';
  coverUri?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  iconUri?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  socials?: Maybe<Array<Maybe<World__Social>>>;
  website?: Maybe<Scalars['String']['output']>;
};

export type World__Entity = {
  __typename?: 'World__Entity';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  models?: Maybe<Array<Maybe<ModelUnion>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type World__EntityConnection = {
  __typename?: 'World__EntityConnection';
  edges?: Maybe<Array<Maybe<World__EntityEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__EntityEdge = {
  __typename?: 'World__EntityEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Entity>;
};

export type World__Event = {
  __typename?: 'World__Event';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type World__EventConnection = {
  __typename?: 'World__EventConnection';
  edges?: Maybe<Array<Maybe<World__EventEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__EventEdge = {
  __typename?: 'World__EventEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Event>;
};

export type World__EventMessage = {
  __typename?: 'World__EventMessage';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  models?: Maybe<Array<Maybe<ModelUnion>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type World__EventMessageConnection = {
  __typename?: 'World__EventMessageConnection';
  edges?: Maybe<Array<Maybe<World__EventMessageEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__EventMessageEdge = {
  __typename?: 'World__EventMessageEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__EventMessage>;
};

export type World__Metadata = {
  __typename?: 'World__Metadata';
  content?: Maybe<World__Content>;
  coverImg?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  iconImg?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
  worldAddress: Scalars['String']['output'];
};

export type World__MetadataConnection = {
  __typename?: 'World__MetadataConnection';
  edges?: Maybe<Array<Maybe<World__MetadataEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__MetadataEdge = {
  __typename?: 'World__MetadataEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Metadata>;
};

export type World__Model = {
  __typename?: 'World__Model';
  classHash?: Maybe<Scalars['felt252']['output']>;
  contractAddress?: Maybe<Scalars['felt252']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  transactionHash?: Maybe<Scalars['felt252']['output']>;
};

export type World__ModelConnection = {
  __typename?: 'World__ModelConnection';
  edges?: Maybe<Array<Maybe<World__ModelEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__ModelEdge = {
  __typename?: 'World__ModelEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Model>;
};

export type World__ModelOrder = {
  direction: OrderDirection;
  field: World__ModelOrderField;
};

export enum World__ModelOrderField {
  ClassHash = 'CLASS_HASH',
  Name = 'NAME'
}

export type World__PageInfo = {
  __typename?: 'World__PageInfo';
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

export type World__Query = {
  __typename?: 'World__Query';
  backpackGridsModels?: Maybe<BackpackGridsConnection>;
  battleLogCounterModels?: Maybe<BattleLogCounterConnection>;
  battleLogDetailModels?: Maybe<BattleLogDetailConnection>;
  battleLogModels?: Maybe<BattleLogConnection>;
  characterItemInventoryModels?: Maybe<CharacterItemInventoryConnection>;
  characterItemStorageModels?: Maybe<CharacterItemStorageConnection>;
  characterItemsInventoryCounterModels?: Maybe<CharacterItemsInventoryCounterConnection>;
  characterItemsStorageCounterModels?: Maybe<CharacterItemsStorageCounterConnection>;
  characterModels?: Maybe<CharacterConnection>;
  dummyCharacterCounterModels?: Maybe<DummyCharacterCounterConnection>;
  dummyCharacterItemModels?: Maybe<DummyCharacterItemConnection>;
  dummyCharacterItemsCounterModels?: Maybe<DummyCharacterItemsCounterConnection>;
  dummyCharacterModels?: Maybe<DummyCharacterConnection>;
  entities?: Maybe<World__EntityConnection>;
  entity: World__Entity;
  eventMessage: World__EventMessage;
  eventMessages?: Maybe<World__EventMessageConnection>;
  events?: Maybe<World__EventConnection>;
  itemModels?: Maybe<ItemConnection>;
  itemsCounterModels?: Maybe<ItemsCounterConnection>;
  metadatas?: Maybe<World__MetadataConnection>;
  model: World__Model;
  models?: Maybe<World__ModelConnection>;
  nameRecordModels?: Maybe<NameRecordConnection>;
  shopModels?: Maybe<ShopConnection>;
  transaction: World__Transaction;
  transactions?: Maybe<World__TransactionConnection>;
};


export type World__QueryBackpackGridsModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<BackpackGridsOrder>;
  where?: InputMaybe<BackpackGridsWhereInput>;
};


export type World__QueryBattleLogCounterModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<BattleLogCounterOrder>;
  where?: InputMaybe<BattleLogCounterWhereInput>;
};


export type World__QueryBattleLogDetailModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<BattleLogDetailOrder>;
  where?: InputMaybe<BattleLogDetailWhereInput>;
};


export type World__QueryBattleLogModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<BattleLogOrder>;
  where?: InputMaybe<BattleLogWhereInput>;
};


export type World__QueryCharacterItemInventoryModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<CharacterItemInventoryOrder>;
  where?: InputMaybe<CharacterItemInventoryWhereInput>;
};


export type World__QueryCharacterItemStorageModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<CharacterItemStorageOrder>;
  where?: InputMaybe<CharacterItemStorageWhereInput>;
};


export type World__QueryCharacterItemsInventoryCounterModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<CharacterItemsInventoryCounterOrder>;
  where?: InputMaybe<CharacterItemsInventoryCounterWhereInput>;
};


export type World__QueryCharacterItemsStorageCounterModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<CharacterItemsStorageCounterOrder>;
  where?: InputMaybe<CharacterItemsStorageCounterWhereInput>;
};


export type World__QueryCharacterModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<CharacterOrder>;
  where?: InputMaybe<CharacterWhereInput>;
};


export type World__QueryDummyCharacterCounterModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DummyCharacterCounterOrder>;
  where?: InputMaybe<DummyCharacterCounterWhereInput>;
};


export type World__QueryDummyCharacterItemModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DummyCharacterItemOrder>;
  where?: InputMaybe<DummyCharacterItemWhereInput>;
};


export type World__QueryDummyCharacterItemsCounterModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DummyCharacterItemsCounterOrder>;
  where?: InputMaybe<DummyCharacterItemsCounterWhereInput>;
};


export type World__QueryDummyCharacterModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<DummyCharacterOrder>;
  where?: InputMaybe<DummyCharacterWhereInput>;
};


export type World__QueryEntitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryEntityArgs = {
  id: Scalars['ID']['input'];
};


export type World__QueryEventMessageArgs = {
  id: Scalars['ID']['input'];
};


export type World__QueryEventMessagesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryItemModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ItemOrder>;
  where?: InputMaybe<ItemWhereInput>;
};


export type World__QueryItemsCounterModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ItemsCounterOrder>;
  where?: InputMaybe<ItemsCounterWhereInput>;
};


export type World__QueryMetadatasArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryModelArgs = {
  id: Scalars['ID']['input'];
};


export type World__QueryModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<World__ModelOrder>;
};


export type World__QueryNameRecordModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<NameRecordOrder>;
  where?: InputMaybe<NameRecordWhereInput>;
};


export type World__QueryShopModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ShopOrder>;
  where?: InputMaybe<ShopWhereInput>;
};


export type World__QueryTransactionArgs = {
  transactionHash: Scalars['ID']['input'];
};


export type World__QueryTransactionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type World__Social = {
  __typename?: 'World__Social';
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type World__Subscription = {
  __typename?: 'World__Subscription';
  entityUpdated: World__Entity;
  eventEmitted: World__Event;
  eventMessageUpdated: World__EventMessage;
  modelRegistered: World__Model;
};


export type World__SubscriptionEntityUpdatedArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type World__SubscriptionEventEmittedArgs = {
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type World__SubscriptionEventMessageUpdatedArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type World__SubscriptionModelRegisteredArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type World__Transaction = {
  __typename?: 'World__Transaction';
  calldata?: Maybe<Array<Maybe<Scalars['felt252']['output']>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  executedAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  maxFee?: Maybe<Scalars['felt252']['output']>;
  nonce?: Maybe<Scalars['felt252']['output']>;
  senderAddress?: Maybe<Scalars['felt252']['output']>;
  signature?: Maybe<Array<Maybe<Scalars['felt252']['output']>>>;
  transactionHash?: Maybe<Scalars['felt252']['output']>;
};

export type World__TransactionConnection = {
  __typename?: 'World__TransactionConnection';
  edges?: Maybe<Array<Maybe<World__TransactionEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__TransactionEdge = {
  __typename?: 'World__TransactionEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Transaction>;
};

export type GetBattleLogQueryVariables = Exact<{
  player: Scalars['ContractAddress']['input'];
}>;


export type GetBattleLogQuery = { __typename?: 'World__Query', battleLogModels?: { __typename?: 'BattleLogConnection', edges?: Array<{ __typename?: 'BattleLogEdge', node?: { __typename?: 'BattleLog', id?: any | null, dummyCharLevel?: any | null, dummyCharId?: any | null, winner?: any | null } | null } | null> | null } | null };

export type GetCharacterQueryVariables = Exact<{
  player: Scalars['ContractAddress']['input'];
}>;


export type GetCharacterQuery = { __typename?: 'World__Query', characterModels?: { __typename?: 'CharacterConnection', edges?: Array<{ __typename?: 'CharacterEdge', node?: { __typename?: 'Character', player?: any | null, name?: any | null, gold?: any | null, health?: any | null, wins?: any | null, loss?: any | null, dummied?: any | null, rating?: any | null, totalWins?: any | null, totalLoss?: any | null, winStreak?: any | null, birthCount?: any | null, updatedAt?: any | null } | null } | null> | null } | null };

export type GetShopQueryVariables = Exact<{
  player: Scalars['ContractAddress']['input'];
}>;


export type GetShopQuery = { __typename?: 'World__Query', shopModels?: { __typename?: 'ShopConnection', edges?: Array<{ __typename?: 'ShopEdge', node?: { __typename?: 'Shop', item1?: any | null, item2?: any | null, item3?: any | null, item4?: any | null, item5?: any | null, item6?: any | null } | null } | null> | null } | null };



export const GetBattleLogDocument = `
    query GetBattleLog($player: ContractAddress!) {
  battleLogModels(where: {player: $player}) {
    edges {
      node {
        id
        dummyCharLevel
        dummyCharId
        winner
      }
    }
  }
}
    `;

export const useGetBattleLogQuery = <
      TData = GetBattleLogQuery,
      TError = unknown
    >(
      variables: GetBattleLogQueryVariables,
      options?: UseQueryOptions<GetBattleLogQuery, TError, TData>
    ) => {
    
    return useQuery<GetBattleLogQuery, TError, TData>(
      ['GetBattleLog', variables],
      useFetchData<GetBattleLogQuery, GetBattleLogQueryVariables>(GetBattleLogDocument).bind(null, variables),
      options
    )};

useGetBattleLogQuery.getKey = (variables: GetBattleLogQueryVariables) => ['GetBattleLog', variables];

export const useInfiniteGetBattleLogQuery = <
      TData = GetBattleLogQuery,
      TError = unknown
    >(
      variables: GetBattleLogQueryVariables,
      options?: UseInfiniteQueryOptions<GetBattleLogQuery, TError, TData>
    ) => {
    const query = useFetchData<GetBattleLogQuery, GetBattleLogQueryVariables>(GetBattleLogDocument)
    return useInfiniteQuery<GetBattleLogQuery, TError, TData>(
      ['GetBattleLog.infinite', variables],
      (metaData) => query({...variables, ...(metaData.pageParam ?? {})}),
      options
    )};

useInfiniteGetBattleLogQuery.getKey = (variables: GetBattleLogQueryVariables) => ['GetBattleLog.infinite', variables];

export const GetCharacterDocument = `
    query GetCharacter($player: ContractAddress!) {
  characterModels(where: {playerEQ: $player}, limit: 1) {
    edges {
      node {
        player
        name
        gold
        health
        wins
        loss
        dummied
        rating
        totalWins
        totalLoss
        winStreak
        birthCount
        updatedAt
      }
    }
  }
}
    `;

export const useGetCharacterQuery = <
      TData = GetCharacterQuery,
      TError = unknown
    >(
      variables: GetCharacterQueryVariables,
      options?: UseQueryOptions<GetCharacterQuery, TError, TData>
    ) => {
    
    return useQuery<GetCharacterQuery, TError, TData>(
      ['GetCharacter', variables],
      useFetchData<GetCharacterQuery, GetCharacterQueryVariables>(GetCharacterDocument).bind(null, variables),
      options
    )};

useGetCharacterQuery.getKey = (variables: GetCharacterQueryVariables) => ['GetCharacter', variables];

export const useInfiniteGetCharacterQuery = <
      TData = GetCharacterQuery,
      TError = unknown
    >(
      variables: GetCharacterQueryVariables,
      options?: UseInfiniteQueryOptions<GetCharacterQuery, TError, TData>
    ) => {
    const query = useFetchData<GetCharacterQuery, GetCharacterQueryVariables>(GetCharacterDocument)
    return useInfiniteQuery<GetCharacterQuery, TError, TData>(
      ['GetCharacter.infinite', variables],
      (metaData) => query({...variables, ...(metaData.pageParam ?? {})}),
      options
    )};

useInfiniteGetCharacterQuery.getKey = (variables: GetCharacterQueryVariables) => ['GetCharacter.infinite', variables];

export const GetShopDocument = `
    query GetShop($player: ContractAddress!) {
  shopModels(where: {player: $player}) {
    edges {
      node {
        item1
        item2
        item3
        item4
        item5
        item6
      }
    }
  }
}
    `;

export const useGetShopQuery = <
      TData = GetShopQuery,
      TError = unknown
    >(
      variables: GetShopQueryVariables,
      options?: UseQueryOptions<GetShopQuery, TError, TData>
    ) => {
    
    return useQuery<GetShopQuery, TError, TData>(
      ['GetShop', variables],
      useFetchData<GetShopQuery, GetShopQueryVariables>(GetShopDocument).bind(null, variables),
      options
    )};

useGetShopQuery.getKey = (variables: GetShopQueryVariables) => ['GetShop', variables];

export const useInfiniteGetShopQuery = <
      TData = GetShopQuery,
      TError = unknown
    >(
      variables: GetShopQueryVariables,
      options?: UseInfiniteQueryOptions<GetShopQuery, TError, TData>
    ) => {
    const query = useFetchData<GetShopQuery, GetShopQueryVariables>(GetShopDocument)
    return useInfiniteQuery<GetShopQuery, TError, TData>(
      ['GetShop.infinite', variables],
      (metaData) => query({...variables, ...(metaData.pageParam ?? {})}),
      options
    )};

useInfiniteGetShopQuery.getKey = (variables: GetShopQueryVariables) => ['GetShop.infinite', variables];
