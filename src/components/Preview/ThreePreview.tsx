import { useCallback, useEffect, useRef, useState, VFC } from 'react';

import cn from 'classnames';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { Loading } from 'components';

import { threeDFormats } from 'appConstants';

import styles from './styles.module.scss';

type TThreeTypes = typeof threeDFormats[number];

type TThreeOptions = {
  fov?: number;
  aspect?: number;
  near?: number;
  far?: number;
};

export interface IThreePreview {
  src: string;
  name: string;
  threeType: TThreeTypes;
  options?: TThreeOptions;
  className?: string;
  freeMove?: boolean;
  lights?: LightModel[];
}

type SingleModel = {
  model: THREE.Group;
  id: number;
  verbose: string;
};

export enum LightsType {
  ambient = 'AmbientLight',
  hemisphere = 'HemisphereLight',
  directional = 'DirectionalLight',
  spot = 'SpotLight',
  point = 'PointLight',
  rectArea = 'RectAreaLight',
}

type LightColor = {
  color: number;
  secondColor?: number;
  intensity?: number;
};

type LightPosition = {
  x?: number;
  y?: number;
  z?: number;
};

type SingleLight = {
  type: LightsType;
  color: LightColor;
  position: LightPosition;
  target?: LightPosition;
  rotation?: LightPosition;
  castShadow?: boolean;
};

export type LightModel = {
  light: SingleLight;
  withHelper?: boolean;
};

type LocalLightModel = {
  light:
    | THREE.AmbientLight
    | THREE.PointLight
    | THREE.HemisphereLight
    | THREE.SpotLight
    | THREE.DirectionalLight
    | THREE.RectAreaLight;
  id: number;
  verbose: string;
  helper:
    | THREE.PointLightHelper
    | THREE.HemisphereLightHelper
    | THREE.SpotLightHelper
    | THREE.DirectionalLightHelper
    | RectAreaLightHelper
    | null;
};

const defaultOptions = {
  fov: 75,
  aspect: 1,
  near: 0.1,
  far: 100,
};

const defaultLights: LightModel[] = [
  {
    light: {
      type: LightsType.hemisphere,
      color: {
        color: 0xb1e1ff,
        secondColor: 0xb97a20,
      },
      position: {
        y: 2.5,
      },
    },
  },
  {
    light: {
      type: LightsType.directional,
      color: {
        color: 0xffffff,
      },
      position: {
        x: -10,
        y: 10,
      },
    },
  },
];

const ThreePreview: VFC<IThreePreview> = ({
  src,
  name,
  threeType,
  options = defaultOptions,
  freeMove = true,
  lights = defaultLights,
}) => {
  const [modelSrc] = useState<string>(src);
  const [id] = useState(name);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [scene] = useState(new THREE.Scene());
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGL1Renderer | null>(null);
  const [controls, setControls] = useState<OrbitControls | null>(null);
  const [models, setModels] = useState<SingleModel[]>([]);
  const [lightsList, setLightsList] = useState<LocalLightModel[]>([]);
  const [loading, setLoading] = useState(false);

  const GLLoader = useCallback(async (modelSource: string) => {
    const loader = new GLTFLoader();
    setLoading(true);
    const modelLoader = loader.loadAsync(modelSource).finally(() => setLoading(false));
    return modelLoader;
  }, []);

  useEffect(() => {
    const { fov, near, far } = options;

    let sceneWidth = window.innerWidth;
    let sceneHeight = window.innerHeight;

    if (wrapRef?.current) {
      sceneWidth = wrapRef.current.clientWidth;
      sceneHeight = wrapRef.current.clientWidth;
    }
    const newCamera = new THREE.PerspectiveCamera(fov, sceneWidth / sceneHeight, near, far);
    setCamera(newCamera);
  }, [options]);

  useEffect(() => {
    const sceneWidth = window.innerWidth;
    const sceneHeight = window.innerHeight;
    const newRenderer = new THREE.WebGL1Renderer({
      canvas: document.querySelector(`#${id}`) || undefined,
      alpha: true,
      antialias: true,
    });
    newRenderer.setPixelRatio(window.devicePixelRatio);
    newRenderer.setSize(sceneWidth, sceneHeight);
    setRenderer(newRenderer);
  }, [id]);

  useEffect(() => {
    if (camera && renderer) {
      const newControls = new OrbitControls(camera, renderer.domElement);
      newControls.autoRotate = true;
      newControls.autoRotateSpeed = 2;
      if (freeMove) {
        newControls.keys = {
          LEFT: 'ArrowLeft',
          UP: 'ArrowUp',
          RIGHT: 'ArrowRight',
          BOTTOM: 'ArrowDown',
        };
        newControls.mouseButtons = {
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN,
        };
        newControls.touches = {
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        };
      }
      setControls(newControls);
    }
  }, [camera, freeMove, renderer]);

  const onWindowResize = useCallback(() => {
    let sceneWidth = window.innerWidth;
    let sceneHeight = window.innerHeight;

    if (wrapRef?.current) {
      sceneWidth = wrapRef.current.clientWidth;
      sceneHeight = wrapRef.current.clientHeight;
    }

    if (camera && renderer) {
      camera.aspect = sceneWidth / sceneHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(sceneWidth, sceneHeight);
    }
  }, [camera, renderer]);

  useEffect(() => {
    onWindowResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapRef.current]);

  useEffect(() => {
    window.addEventListener('resize', onWindowResize, false);
    return () => {
      window.removeEventListener('resize', onWindowResize, false);
    };
  }, [onWindowResize]);

  const removeModelFromScene = useCallback(
    (n: number) => {
      if (scene) {
        const rModel = scene.getObjectById(n);
        if (rModel) {
          scene.remove(rModel);
          const nModelList = models;
          nModelList.splice(
            nModelList.findIndex((m) => m.id === rModel.id),
            1,
          );
          setModels(nModelList);
        }
      }
    },
    [models, scene],
  );

  const removeAllModelsFromScene = useCallback(() => {
    if (models.length) {
      models.forEach((m) => {
        removeModelFromScene(m.id);
      });
    }
  }, [models, removeModelFromScene]);

  const addModelsToScene = useCallback(() => {
    if (scene && models.length) {
      models.forEach((model) => {
        scene.add(model.model);
      });
    }
  }, [models, scene]);

  const removeLightFromScene = useCallback(
    (n: number) => {
      if (scene) {
        const lModel = scene.getObjectById(n);
        if (lModel) {
          scene.remove(lModel);
          if (
            lModel instanceof THREE.DirectionalLight ||
            (lModel instanceof THREE.SpotLight && lModel.target)
          ) {
            scene.remove(lModel.target);
          }
          const nLightList = lightsList;
          const removableLight = nLightList.splice(
            nLightList.findIndex((m) => m.id === lModel.id),
            1,
          )[0];
          if (removableLight.helper) {
            const { helper } = removableLight;
            const hModel = scene.getObjectById(helper.id);
            if (hModel) {
              scene.remove(hModel);
            }
          }
          setLightsList(nLightList);
        }
      }
    },
    [lightsList, scene],
  );

  const removeAllLightsFromScene = useCallback(() => {
    if (lightsList.length) {
      lightsList.forEach((m) => {
        removeLightFromScene(m.id);
      });
    }
  }, [lightsList, removeLightFromScene]);

  const addLightsToScene = useCallback(() => {
    if (scene && lightsList.length) {
      lightsList.forEach((l) => {
        const { light, helper } = l;
        scene.add(light);
        if (light instanceof THREE.DirectionalLight || light instanceof THREE.SpotLight) {
          scene.add(light.target);
        }
        if (helper) {
          scene.add(helper);
        }
      });
    }
  }, [lightsList, scene]);

  const modifyLight = useCallback((l: LightModel) => {
    const lightData = l.light;
    const helper = l.withHelper;
    const colorData = lightData.color;
    const specificLight = new THREE[lightData.type](colorData.color, colorData.intensity || 1);
    if (
      lightData.type === LightsType.hemisphere &&
      specificLight instanceof THREE.HemisphereLight
    ) {
      specificLight.groundColor.set(colorData.secondColor || colorData.color);
    }
    const { x, y, z } = lightData.position;
    specificLight.position.set(x || 0, y || 0, z || 0);
    const { target, rotation } = lightData;
    if (
      target &&
      (specificLight instanceof THREE.DirectionalLight || specificLight instanceof THREE.SpotLight)
    ) {
      const tx = target.x || 0;
      const ty = target.y || 0;
      const tz = target.z || 0;
      specificLight.target.position.set(tx, ty, tz);
    }
    if (rotation) {
      const rx = rotation.x || 0;
      const ry = rotation.y || 0;
      const rz = rotation.z || 0;
      specificLight.rotation.set(rx, ry, rz);
    }
    let lightHelper = null;
    if (
      helper &&
      lightData.type !== LightsType.ambient &&
      !(specificLight instanceof THREE.AmbientLight)
    ) {
      if (specificLight instanceof THREE.PointLight) {
        lightHelper = new THREE.PointLightHelper(specificLight);
      }
      if (specificLight instanceof THREE.DirectionalLight) {
        lightHelper = new THREE.DirectionalLightHelper(specificLight);
      }
      if (specificLight instanceof THREE.RectAreaLight) {
        lightHelper = new RectAreaLightHelper(specificLight);
      }
      if (specificLight instanceof THREE.SpotLight) {
        lightHelper = new THREE.SpotLightHelper(specificLight);
      }
      if (specificLight instanceof THREE.HemisphereLight) {
        lightHelper = new THREE.HemisphereLightHelper(specificLight, 1);
      }
    }
    return { light: specificLight, helper: lightHelper };
  }, []);

  const animate = useCallback(() => {
    if (controls && renderer && scene && camera) {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
  }, [camera, controls, renderer, scene]);

  // update lights state
  useEffect(() => {
    const modify = lights.map((l) => {
      const { light, helper } = modifyLight(l);
      const nLight = {
        light,
        id: light.id,
        verbose: light.uuid,
        helper,
      };
      return nLight;
    });
    setLightsList(modify);
  }, [lights, modifyLight]);

  // load lights
  useEffect(() => {
    removeAllLightsFromScene();
    addLightsToScene();
  }, [addLightsToScene, removeAllLightsFromScene]);

  useEffect(() => {
    if (scene) {
      scene.background = null;
    }
  }, [scene]);

  // update models state
  useEffect(() => {
    if (camera && renderer) {
      camera.position.set(10, 10, 10);
      switch (threeType) {
        case 'glf':
        case 'glb': {
          console.log(src);
          GLLoader(src).then((newModel) => {
            newModel.scene.traverse((obj: THREE.Object3D<THREE.Event>) => {
              if ((obj as THREE.Mesh).isMesh) {
                obj.castShadow = true;
              }
            });
            const nModel: SingleModel = {
              model: newModel.scene,
              id: newModel.scene.id,
              verbose: src.slice(0, 100),
            };
            if (models.findIndex((m) => m.verbose === nModel.verbose) === -1) {
              setModels((prev) => [...prev, nModel]);
            }
          });
          renderer.outputEncoding = THREE.sRGBEncoding;
          break;
        }
        default:
          break;
      }
    }
  }, [modelSrc, threeType, src, GLLoader, camera, renderer, models]);

  // load models
  useEffect(() => {
    removeAllModelsFromScene();
    addModelsToScene();
  }, [addModelsToScene, removeAllModelsFromScene]);

  useEffect(() => {
    if (lightsList.length || models.length) {
      animate();
    }
  }, [animate, lightsList.length, models.length]);

  return (
    <div className={cn(styles['three-preview__wrapper'])} ref={wrapRef}>
      <div
        className={cn(styles['three-preview__wrapper-loader'], {
          [styles['loading-active']]: loading,
        })}
      >
        <Loading />
      </div>
      <canvas className={styles['three-preview__wrapper-field']} id={id} />
    </div>
  );
};

export default ThreePreview;
