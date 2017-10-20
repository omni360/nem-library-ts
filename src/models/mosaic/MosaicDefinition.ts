/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 NEM
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import {MosaicDefinitionDTO} from "../../infrastructure/mosaic/MosaicDefinitionDTO";
import {MosaicDefinitionMetaDataPairDTO} from "../../infrastructure/mosaic/MosaicDefinitionMetaDataPairDTO";
import {MosaicLevyDTO} from "../../infrastructure/mosaic/MosaicLevyDTO";
import {MosaicPropertyDTO} from "../../infrastructure/mosaic/MosaicPropertyDTO";
import {PublicAccount} from "../account/PublicAccount";
import {MosaicId} from "./MosaicId";
import {MosaicLevy} from "./MosaicLevy";

/**
 * A mosaic definition describes an asset class. Some fields are mandatory while others are optional.
 * The properties of a mosaic definition always have a default value and only need to be supplied if they differ from the default value.
 */
export class MosaicDefinition {

  /**
   * 	The public key of the mosaic definition creator.
   */
  public readonly creator: PublicAccount;

  /**
   * The mosaic id
   */
  public readonly id: MosaicId;

  /**
   * The mosaic description. The description may have a length of up to 512 characters and cannot be empty.
   */
  public readonly description: string;

  /**
   * Mosaic properties
   */
  public readonly properties: MosaicProperties;

  /**
   * The optional levy for the mosaic. A creator can demand that each mosaic transfer induces an additional fee
   */
  public readonly levy?: MosaicLevy;

  /**
   * The id for the mosaic definition object.
   */
  public readonly metaId?: number;

  /**
   * constructor
   * @param creator
   * @param id
   * @param description
   * @param properties
   * @param levy
   * @param metaId
   */
  constructor(
    creator: PublicAccount,
    id: MosaicId,
    description: string,
    properties: MosaicProperties,
    levy?: MosaicLevy,
    metaId?: number,
  ) {
    this.creator = creator;
    this.id = id;
    this.description = description;
    this.properties = properties;
    this.levy = levy;
    this.metaId = metaId;
  }

  /**
   * @internal
   * @param dto
   * @returns {MosaicDefinition}
   */
  public static createFromMosaicDefinitionDTO(dto: MosaicDefinitionDTO): MosaicDefinition {
    const levy = dto.levy as MosaicLevyDTO;
    return new MosaicDefinition(
      PublicAccount.createWithPublicKey(dto.creator),
      MosaicId.createFromMosaicIdDTO(dto.id),
      dto.description,
      MosaicProperties.createFromMosaicProperties(dto.properties),
      levy.mosaicId === undefined ? undefined : MosaicLevy.createFromMosaicLevyDTO(levy),
    );
  }

  /**
   * @internal
   * @param dto
   * @returns {MosaicDefinition}
   */
  public static createFromMosaicDefinitionMetaDataPairDTO(dto: MosaicDefinitionMetaDataPairDTO): MosaicDefinition {
    const levy = dto.mosaic.levy as MosaicLevyDTO;
    return new MosaicDefinition(
      PublicAccount.createWithPublicKey(dto.mosaic.creator),
      MosaicId.createFromMosaicIdDTO(dto.mosaic.id),
      dto.mosaic.description,
      MosaicProperties.createFromMosaicProperties(dto.mosaic.properties),
      levy.mosaicId === undefined ? undefined : MosaicLevy.createFromMosaicLevyDTO(levy),
      dto.meta.id,
    );
  }

  /**
   * @internal
   * @returns {{description: string, id: MosaicId, levy: (MosaicLevyDTO|{}), properties: MosaicProperty[], creator: string}}
   */
  public toDTO(): MosaicDefinitionDTO {
    return {
      description: this.description,
      id: this.id,
      levy: this.levy != undefined ? this.levy.toDTO() : null,
      properties: this.properties.toDTO(),
      creator: this.creator.publicKey,
    };
  }
}

/**
 * Each mosaic definition comes with a set of properties.
 * Each property has a default value which will be applied in case it was not specified.
 * Future release may add additional properties to the set of available properties
 */
export class MosaicProperties {

  /**
   * initialSupply: The creator can specify an initial supply of mosaics when creating the definition.
   * The supply is given in entire units of the mosaic, not in smallest sub-units.
   * The initial supply must be in the range of 0 and 9,000,000,000. The default value is "1000".
   */
  public readonly initialSupply: number;

  /**
   * The creator can choose between a definition that allows a mosaic supply change at a later point or an immutable supply.
   * Allowed values for the property are "true" and "false". The default value is "false".
   */
  public readonly supplyMutable: boolean;

  /**
   * The creator can choose if the mosaic definition should allow for transfers of the mosaic among accounts other than the creator.
   * If the property 'transferable' is set to "false", only transfer transactions having the creator as sender or as recipient can transfer mosaics of that type.
   * If set to "true" the mosaics can be transferred to and from arbitrary accounts.
   * Allowed values for the property are thus "true" and "false". The default value is "true".
   */
  public readonly transferable: boolean;

  /**
   * The divisibility determines up to what decimal place the mosaic can be divided into.
   * Thus a divisibility of 3 means that a mosaic can be divided into smallest parts of 0.001 mosaics, i.e. milli mosaics is the smallest sub-unit.
   * When transferring mosaics via a transfer transaction the quantity transferred is given in multiples of those smallest parts.
   * The divisibility must be in the range of 0 and 6. The default value is "0".
   */
  public readonly divisibility: number;

  /**
   * constructor
   * @param divisibility
   * @param initialSupply
   * @param supplyMutable
   * @param transferable
   */
  constructor(
    divisibility: number = 0,
    initialSupply: number = 1000,
    transferable: boolean = true,
    supplyMutable: boolean = false,
  ) {
    this.initialSupply = initialSupply;
    this.supplyMutable = supplyMutable;
    this.transferable = transferable;
    this.divisibility = divisibility;
  }

  /**
   * @internal
   */
  public toDTO() {
    return [
      {
        name: "divisibility",
        value: this.divisibility.toString(),
      },
      {
        name: "initialSupply",
        value: this.initialSupply.toString(),
      },
      {
        name: "supplyMutable",
        value: this.supplyMutable.toString(),
      },
      {
        name: "transferable",
        value: this.transferable.toString(),
      },
    ] as MosaicPropertyDTO[];
  }

  /**
   * @internal
   * @param dto
   * @returns {MosaicProperty}
   */
  public static createFromMosaicProperties(mosaicProperties: MosaicPropertyDTO[]): MosaicProperties {
    return new MosaicProperties(
      Number(mosaicProperties[0].value),
      Number(mosaicProperties[1].value),
      (mosaicProperties[2].value == "true"),
      (mosaicProperties[3].value == "true"),
    );
  }
}
