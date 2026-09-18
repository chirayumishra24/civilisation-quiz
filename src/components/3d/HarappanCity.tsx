import React from 'react';
import { TeamId } from '../../types/game';
import {
  BrickHouse,
  PlannedStreet,
  CoveredDrain,
  BrickWell,
  ElevatedPlatform,
  GreatBath,
  FarmFields,
  Granary,
  CraftWorkshop,
  TradeDockAndWeights,
  SteatiteSealPedestal,
  CityWall,
  HarappanTree,
} from './CityElements';

interface HarappanCityProps {
  stage: number; // 0 to 12
  team: TeamId;
  position?: [number, number, number];
}

export const HarappanCity: React.FC<HarappanCityProps> = ({ stage, team, position = [0, 0, 0] }) => {
  const isMohenjo = team === 'mohenjo';
  const teamBannerColor = isMohenjo ? '#3B82F6' : '#F97316';

  return (
    <group position={position}>
      {/* City Base Foundation */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[6.5, 6.8, 0.1, 32]} />
        <meshStandardMaterial color={isMohenjo ? '#E2CDB0' : '#DEC49D'} roughness={0.95} />
      </mesh>

      {/* Team Banner Landmark */}
      <group position={[0, 0.05, 4.2]}>
        <mesh position={[0, 0.75, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 1.5, 8]} />
          <meshStandardMaterial color="#5C3A21" />
        </mesh>
        <mesh position={[0.3, 1.25, 0]} castShadow>
          <boxGeometry args={[0.6, 0.35, 0.02]} />
          <meshStandardMaterial color={teamBannerColor} roughness={0.5} />
        </mesh>
      </group>

      {/* STAGE 0: Initial site pegs and layout strings */}
      {stage === 0 && (
        <group position={[0, 0, 0]}>
          {[-1.5, 0, 1.5].map((x) =>
            [-1.5, 0, 1.5].map((z) => (
              <mesh key={`peg-${x}-${z}`} position={[x, 0.1, z]}>
                <cylinderGeometry args={[0.02, 0.02, 0.2, 6]} />
                <meshStandardMaterial color="#8B4513" />
              </mesh>
            ))
          )}
        </group>
      )}

      {/* STAGE 1: First Mud-Brick Settlement */}
      {stage >= 1 && (
        <group>
          <BrickHouse position={[-1.6, 0, -1.2]} size={[1.2, 0.8, 1.0]} />
          <BrickHouse position={[-1.6, 0, 0.5]} size={[1.1, 0.75, 1.1]} />
        </group>
      )}

      {/* STAGE 2: Planned Residential Houses with Courtyards */}
      {stage >= 2 && (
        <group>
          <BrickHouse position={[1.5, 0, -1.2]} size={[1.4, 0.9, 1.3]} hasCourtyard rotation={Math.PI} />
          <BrickHouse position={[1.5, 0, 0.6]} size={[1.3, 0.85, 1.2]} hasCourtyard />
        </group>
      )}

      {/* STAGE 3: Planned Grid Streets */}
      {stage >= 3 && (
        <group>
          {/* Main North-South Street */}
          <PlannedStreet start={[0, 0, -3.5]} length={7.0} width={0.9} />
          {/* East-West Cross Street */}
          <PlannedStreet start={[-3.5, 0, 0]} length={7.0} width={0.7} horizontal />
        </group>
      )}

      {/* STAGE 4: Brick Wells for Clean Water */}
      {stage >= 4 && (
        <group>
          <BrickWell position={[-0.8, 0, -0.6]} />
          <BrickWell position={[2.2, 0, 1.8]} />
        </group>
      )}

      {/* STAGE 5: Advanced Covered Drainage System */}
      {stage >= 5 && (
        <group>
          {/* Drains running alongside the main street */}
          <CoveredDrain position={[-0.55, 0, -3.2]} length={6.4} />
          <CoveredDrain position={[0.55, 0, -3.2]} length={6.4} />
          {/* Cross drain connected to houses */}
          <CoveredDrain position={[-2.8, 0, 0.45]} length={2.2} horizontal />
        </group>
      )}

      {/* STAGE 6: Public Citadel & Great Bath / Great Water Reservoirs */}
      {stage >= 6 && (
        <group>
          {isMohenjo ? (
            /* Mohenjo-daro Great Bath atop western Citadel */
            <group position={[-2.0, 0, -2.4]}>
              <GreatBath position={[0, 0, 0]} />
            </group>
          ) : (
            /* Dholavira Giant Step-well / Stone Reservoir */
            <group position={[-2.0, 0, -2.4]}>
              <ElevatedPlatform position={[0, 0, 0]} size={[3.4, 0.6, 2.6]} />
              <mesh position={[0, 0.35, 0]}>
                <boxGeometry args={[2.4, 0.2, 1.6]} />
                <meshStandardMaterial color="#0284C7" transparent opacity={0.8} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* STAGE 7: Food & Farming (Granaries and agricultural fields) */}
      {stage >= 7 && (
        <group>
          <FarmFields position={[3.2, 0, -2.2]} />
          <Granary position={[1.8, 0, -2.5]} />
        </group>
      )}

      {/* STAGE 8: Craft Production (Pottery kilns, bead workshops) */}
      {stage >= 8 && (
        <group>
          <CraftWorkshop position={[-2.6, 0, 1.8]} />
        </group>
      )}

      {/* STAGE 9: Trade Network (Chert weights, carts, warehouse dock) */}
      {stage >= 9 && (
        <group>
          <TradeDockAndWeights position={[2.8, 0, 2.2]} />
        </group>
      )}

      {/* STAGE 10: Seals & Undeciphered Harappan Script */}
      {stage >= 10 && (
        <group>
          <SteatiteSealPedestal position={[0, 0, 2.0]} />
        </group>
      )}

      {/* STAGE 11: Fortified City Walls and Massive Bastions */}
      {stage >= 11 && (
        <group>
          <CityWall position={[-4.5, 0, -4.5]} length={9.0} horizontal />
          <CityWall position={[-4.5, 0, -4.5]} length={9.0} />
          <CityWall position={[4.5, 0, -4.5]} length={9.0} />
        </group>
      )}

      {/* STAGE 12: Complete Flourishing Harappan Civilisation */}
      {stage >= 12 && (
        <group>
          <HarappanTree position={[-1.2, 0, 3.2]} />
          <HarappanTree position={[1.4, 0, 3.4]} />
          <HarappanTree position={[-3.8, 0, -1.0]} />
          <HarappanTree position={[3.8, 0, 0.5]} />
          {/* Extra residential homes */}
          <BrickHouse position={[-3.4, 0, 0.4]} size={[1.0, 0.7, 0.9]} />
          <BrickHouse position={[3.4, 0, -0.8]} size={[1.0, 0.75, 1.0]} />
        </group>
      )}
    </group>
  );
};
