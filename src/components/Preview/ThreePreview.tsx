import { useCallback, useEffect, useRef, useState, VFC } from 'react';

import cn from 'classnames';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { threeDFormats } from 'appConstants';

import styles from './styles.module.scss';

type TThreeTypes = typeof threeDFormats[number];

const getThreeType = (name: string) => {
  return name.slice(name.lastIndexOf('.') + 1) as TThreeTypes;
};

type TThreeOptions = {
  fov?: number;
  aspect?: number;
  near?: number;
  far?: number;
};

export interface IThreePreview {
  src: string;
  name: string;
  threeType?: TThreeTypes;
  options?: TThreeOptions;
  className?: string;
}

const defaultOptions = {
  fov: 75,
  aspect: 1,
  near: 0.1,
  far: 1000,
};

const normalizeSrc = (src: string) => {
  return `id${src.replaceAll('-', '').replaceAll('.', '')}`;
};

const ThreePreview: VFC<IThreePreview> = ({ src, name, threeType, options = defaultOptions }) => {
  const [modelSrc] = useState<string>(src);
  const [id] = useState(normalizeSrc(src) || name);
  const wrapRef = useRef<HTMLElement | null>(null);
  const [scene] = useState(new THREE.Scene());
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGL1Renderer | null>(null);

  const GLLoader = useCallback(async (modelSource: string) => {
    const loader = new GLTFLoader();
    const model = await loader.loadAsync(modelSource);
    model.scene.traverse((object: any) => {
      object.castShadow = true;
    });
    return model.scene;
  }, []);

  useEffect(() => {
    const { fov, near, far } = options;

    let sceneWidth = window.innerWidth;
    let sceneHeight = window.innerHeight;

    if (wrapRef?.current) {
      sceneWidth = wrapRef.current.clientWidth;
      sceneHeight = wrapRef.current.clientWidth;
    }

    setCamera(new THREE.PerspectiveCamera(fov, sceneWidth / sceneHeight, near, far));
  }, [options]);

  useEffect(() => {
    const sceneWidth = window.innerWidth;
    const sceneHeight = window.innerHeight;
    setRenderer(
      new THREE.WebGL1Renderer({
        canvas: document.querySelector(`#${id}`) || undefined,
      }),
    );
    if (renderer) {
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(sceneWidth, sceneHeight);
    }
  }, [id, renderer]);

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

  useEffect(() => {
    if (camera && renderer) {
      camera.position.set(0.3, 0.2, 0.3);

      const pointLight = new THREE.PointLight(0xffffff);
      const pointLight_2 = new THREE.PointLight(0xffff00);
      pointLight.position.set(100, 100, 100);
      pointLight_2.position.set(-100, 100, 100);

      const ambientLight = new THREE.AmbientLight(0xffffff);
      scene.add(pointLight, ambientLight);

      const controls = new OrbitControls(camera, renderer.domElement);
      const background = new THREE.Color('#FF6701');
      scene.background = background;

      let model = null;

      switch (threeType || getThreeType(src)) {
        case 'glf':
        case 'glb': {
          GLLoader(src).then((newModel) => {
            model = newModel;
          });
          break;
        }
        default:
          break;
      }

      if (model) {
        scene.add(model);
      }

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();

        renderer.render(scene, camera);
      };

      animate();
    }
  }, [scene, modelSrc, threeType, src, GLLoader, camera, renderer]);

  return (
    <div className={cn(styles['three-preview__wrapper'])}>
      <canvas className={styles['three-preview__wrapper-field']} id={id} />
    </div>
  );
};

export default ThreePreview;
