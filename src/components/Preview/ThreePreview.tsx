import { useCallback, useEffect, useRef, useState, VFC } from 'react';

import cn from 'classnames';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
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
}

type SingleModel = {
  model: THREE.Group;
  id: string;
  verbose: string;
};

const defaultOptions = {
  fov: 75,
  aspect: 1,
  near: 0.1,
  far: 100,
};

const ThreePreview: VFC<IThreePreview> = ({
  src,
  name,
  threeType,
  options = defaultOptions,
  freeMove = true,
}) => {
  const [modelSrc] = useState<string>(src);
  const [id] = useState(name);
  const wrapRef = useRef<HTMLElement | null>(null);
  const [scene] = useState(new THREE.Scene());
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGL1Renderer | null>(null);
  const [controls, setControls] = useState<OrbitControls | null>(null);
  const [models, setModels] = useState<SingleModel[]>([]);
  const [loading, setLoading] = useState(false);
  console.log(models);
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

  const OrbitKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (camera) {
        console.log(e.key);
      }
    },
    [camera],
  );

  useEffect(() => {
    if (freeMove) {
      window.addEventListener('keypress', OrbitKeyPress);
    } else {
      window.removeEventListener('keypress', OrbitKeyPress);
    }

    return () => {
      window.removeEventListener('keypress', OrbitKeyPress);
    };
  }, [OrbitKeyPress, freeMove]);

  useEffect(() => {
    const sceneWidth = window.innerWidth;
    const sceneHeight = window.innerHeight;
    const newRenderer = new THREE.WebGL1Renderer({
      canvas: document.querySelector(`#${id}`) || undefined,
    });
    newRenderer.setPixelRatio(window.devicePixelRatio);
    newRenderer.setSize(sceneWidth, sceneHeight);
    setRenderer(newRenderer);
  }, [id]);

  useEffect(() => {
    if (camera && renderer) {
      const newControls = new OrbitControls(camera, renderer.domElement);
      setControls(newControls);
    }
  }, [camera, renderer]);

  const onWindowResize = useCallback(() => {
    let sceneWidth = window.innerWidth;
    let sceneHeight = window.innerHeight;

    if (wrapRef?.current) {
      sceneWidth = wrapRef.current.clientWidth;
      sceneHeight = wrapRef.current.clientWidth;
    }
    if (camera && renderer) {
      camera.aspect = sceneWidth / sceneHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(sceneWidth, sceneHeight);
    }
  }, [camera, renderer]);

  useEffect(() => {
    window.addEventListener('resize', onWindowResize, false);
    return () => {
      window.removeEventListener('resize', onWindowResize, false);
    };
  }, [onWindowResize]);

  /* const removeModelFromScene = useCallback(
    (n: string) => {
      if (scene) {
        const rModel = scene.getObjectByName(n);
        if (rModel) {
          scene.remove(rModel);
          const nModelList = models;
          nModelList.splice(
            nModelList.findIndex((m) => m.id === rModel.uuid),
            1,
          );
          setModels(nModelList);
        }
      }
    },
    [models, scene],
  ); */

  /* const removeAllModelsFromScene = useCallback(() => {
    if (models.length) {
      models.forEach((m) => {
        removeModelFromScene(m.verbose);
      });
    }
  }, [models, removeModelFromScene]); */

  /* const addModelsToScene = useCallback(() => {
    if (scene && models.length) {
      models.forEach((model) => {
        scene.add(model.model);
      });
    }
  }, [models, scene]); */

  const animate = useCallback(() => {
    if (controls && renderer && scene && camera) {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
  }, [camera, controls, renderer, scene]);

  useEffect(() => {
    if (camera && renderer) {
      camera.position.set(10, 10, 10);

      const ambient = new THREE.AmbientLight(0xffffcc, 0.95);
      const backLight = new THREE.DirectionalLight(0xffffff, 0.25);
      const frontLight = new THREE.DirectionalLight(0xffffff, 0.25);
      backLight.position.set(3, 10, 10);
      frontLight.position.set(-3, 10, -10);
      scene.add(ambient, backLight, frontLight);

      const gridHelper = new THREE.GridHelper(200, 50);
      scene.add(gridHelper);

      const background = new THREE.Color('#d3d3d3');
      scene.background = background;
      switch (threeType) {
        case 'glf':
        case 'glb': {
          GLLoader(src).then((newModel) => {
            newModel.scene.traverse((obj: THREE.Object3D<THREE.Event>) => {
              obj.castShadow = true;
            });
            newModel.scene.translateZ(-10);
            const nModel: SingleModel = {
              model: newModel.scene,
              id: newModel.scene.uuid,
              verbose: newModel.scene.name,
            };
            setModels((prev) => [...prev, nModel]);
          });
          renderer.outputEncoding = THREE.sRGBEncoding;
          break;
        }
        default:
          break;
      }
      animate();
    }
  }, [scene, modelSrc, threeType, src, GLLoader, camera, renderer, animate]);

  useEffect(() => {
    onWindowResize();
    // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn(styles['three-preview__wrapper'])}>
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
