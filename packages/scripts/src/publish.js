const fs = require( 'fs' );
const path = require( 'path' );
const { execSync } = require( 'child_process' );

const argRoot = process.argv[2];
const PACKAGES_DIR = path.resolve( argRoot, './packages' );
const IGNORE_PACKAGES = ["@dmsconnect/typescript-config", "@dmsconnect/eslint-config", "@dmsconnect/scripts"]

function getDirectories( srcPath ) {
  return fs.readdirSync( srcPath ).filter( ( file ) =>
    fs.statSync( path.join( srcPath, file ) ).isDirectory()
  );
}

function readJson( filePath ) {
  return JSON.parse( fs.readFileSync( filePath, 'utf8' ) );
}

function getPublishedVersion( pkgName ) {
  try {
    return execSync( `npm view ${ pkgName } version` ).toString().trim();
  } catch ( error ) {
    return null;
  }
}

function publishPackage( pkgPath ) {
  try {
    console.log( `📦 Publishing ${ pkgPath }...` );
    execSync( `npm publish  --access=restricted`, { cwd: pkgPath, stdio: 'inherit' } );
  } catch ( error ) {
    console.error( `❌ Failed to publish ${ pkgPath }:`, error.message );
  }
}

function buildPackage( packageName ) {
  console.log( `🏗️ Building ${ packageName }` );
  execSync( `yarn build --filter=${ packageName }`, { cwd: argRoot } )
}

function publishCD() {
  const packageDirs = getDirectories( PACKAGES_DIR );
  for ( const dir of packageDirs ) {
    const pkgPath = path.join( PACKAGES_DIR, dir );
    const pkgJsonPath = path.join( pkgPath, 'package.json' );
    if ( !fs.existsSync( pkgJsonPath ) ) continue;

    const { name, version } = readJson( pkgJsonPath );
    if ( !name || !version || IGNORE_PACKAGES.includes( name ) ) continue;

    const publishedVersion = getPublishedVersion( name );

    if ( !publishedVersion ) {
      console.info( `${ name } is not published yet.` );
      console.log( `Building ${ name }@${ version } ` );
      buildPackage( name )
      console.log( `Publishing ${ name }@${ version }` );
      publishPackage( pkgPath )

    } else if ( version !== publishedVersion ) {
      console.info( `New Version Available ${ name }@${ version }` );
      console.log( `Building ${ name }@${ version } ` );
      buildPackage( name );
      console.log( `Publishing ${ name }@${ version }` );
      publishPackage( pkgPath )
    } else {
      console.log( `✅ ${ name } is up-to-date (v${ version })` );
    }
  }
}

publishCD();